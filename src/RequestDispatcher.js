import fs from 'fs';
import request from 'request';
import extend from 'extend';
import Promise from 'bluebird';
import _ from 'lodash';
import checkUrl from './helper/checkUrl';

/**
 * Class representing a request dispatcher.
 * @description Performs HTTP requests providing a simple API.
 * @example
 *  import RequestDispatcher from './RequestDispatcher';
 *  const dispatcher = new RequestDispatcher({ user: 'marcus', pass: '1234' });
 *  dispatcher.get('http://my.secure/page').then(console.log);
 *
 */
class RequestDispatcher {

  /**
   * Creates an instance of request dispatcher.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */
  constructor(auth) {
    // Validate and set credentials.
    this._validateCredentials(auth);
    this.auth = auth;
  }

  /**
   * Validates provided credentials.
   * @see #constructor for parameters.
   * @throws {Error} On missing or invalid credentials.
   * @private
   */
  _validateCredentials(auth) {
    // Check object.
    if (_.isNil(auth) || !_.isObject(auth)) {
      throw new Error('Missing or invalid authentication object');
    }

    // Check user.
    if (_.isNil(auth.user) || !_.isString(auth.user)) {
      throw new Error('Missing or invalid user');
    }

    // Check password.
    if (_.isNil(auth.pass) || !_.isString(auth.pass)) {
      throw new Error('Missing or invalid password');
    }
  }

  /**
   * Sends a request and handles the response.
   * @param {Object} parameters Request parameters.
   * @return {Promise}
   * @private
   */
  _send(parameters) {
    // Default request parameters.
    const defaults = {
      headers: { 'User-Agent': 'Node Gambio API client' },
      auth: this.auth,
    };

    // Extend default parameters with provided ones.
    const requestParameters = extend(true, {}, defaults, parameters);

    // Return a new promise and perform the request.
    return new Promise((resolve, reject) => {
      // Response data.
      let data;

      request(requestParameters, (error, response) => {
        // Check for request errors and reject promise.
        if (error) {
          reject(error);
          return;
        }

        // Parse response body as JSON.
        try {
          data = JSON.parse(response.body);
        } catch (parseError) {
          data = response.body;
        }

        // Check for successful status code and resolve promise.
        if (_.inRange(response.statusCode, 199, 300)) {
          resolve(data);
          return;
        }

        // Check for error/redirection status code and reject promise.
        if (_.inRange(response.statusCode, 300, 600)) {
          const serverError = new Error('Server responded with error or redirection');
          serverError.data = data;

          reject(serverError);
          return;
        }
      });
    });
  }

  /**
   * Performs a GET request.
   * @param {String} url           Request URL.
   * @param {Object} [queryString] Query string parameters.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  get(url, queryString) {
    checkUrl(url);

    if (queryString && !_.isObject(queryString)) {
      throw new Error('Invalid GET query string parameters.');
    }

    const parameters = { method: 'GET', url };

    if (queryString) {
      extend(parameters, { qs: queryString });
    }

    return this._send(parameters);
  }

  /**
   * Performs a POST request.
   * @param {String} url    Request URL.
   * @param {Object} [data] POST request data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  post(url, data) {
    checkUrl(url);

    // Validate POST data type.
    if (data && !_.isObject(data)) {
      throw new Error('Invalid POST data object');
    }

    const parameters = {
      method: 'POST',
      json: true,
      body: data ? data : {},
      url,
    };

    return this._send(parameters);
  }

  /**
   * Performs a DELETE request.
   * @param {String} url    Request URL.
   * @param {Object} [data] Data parameters.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  delete(url, data) {
    checkUrl(url);

    if (data && !_.isObject(data)) {
      throw new Error('Invalid DELETE data parameter.');
    }

    const parameters = { method: 'DELETE', url };

    if (data) {
      extend(parameters, { json: true, body: data });
    }

    return this._send(parameters);
  }

  /**
   * Performs a PUT request.
   * @param {String}  url       Request URL.
   * @param {Object}  [data]    Request data.
   * @param {Boolean} [isPatch] Perform a PATCH request instead of PUT?
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  put(url, data, isPatch) {
    checkUrl(url);

    // Validate data.
    if (data && !_.isObject(data)) {
      throw new Error('Invalid data');
    }

    const parameters = {
      method: isPatch ? 'PATCH' : 'PUT',
      json: true,
      body: data ? data : {},
      url,
    };

    return this._send(parameters);
  }

  /**
   * Uploads a file in a POST request.
   * @param {String}    url           Request URL.
   * @param {String}    path          Path to file.
   * @param {String}    name          File name.
   * @param {String[]}  [fieldNames]  Field names.
   * @param {String}    fieldNames[]  File field name.
   * @param {String}    fieldNames[]  Filename field name.
   * @throws {Error} On missing or invalid argument and if file could not be found.
   * @return {Promise}
   */
  uploadFile(url, path, name, fieldNames) {
    checkUrl(url);

    // Validate file path.
    if (_.isNil(path) || !_.isString(path)) {
      throw new Error('Missing or invalid file path');
    }

    // Validate file name.
    if (_.isNil(name) || !_.isString(name)) {
      throw new Error('Missing or invalid file name');
    }

    // Validate field names.
    if (fieldNames && !_.isArray(fieldNames)) {
      throw new Error('Invalid fieldnames array');
    }

    // Read file.
    const file = fs.createReadStream(path);

    // Field names
    const fileFieldname = fieldNames ? fieldNames[0] : 'file';
    const nameFieldname = fieldNames ? fieldNames[1] : 'filename';

    // Form data.
    const data = {};

    data[fileFieldname] = file;
    data[nameFieldname] = name;

    const parameters = {
      method: 'POST',
      formData: data,
      url,
    };

    return this._send(parameters);
  }
}

export default RequestDispatcher;
