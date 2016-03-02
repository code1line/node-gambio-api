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
   * @param {String} url Request URL.
   * @return {Promise}
   */
  get(url) {
    checkUrl(url);

    const parameters = { method: 'GET', url };
    return this._send(parameters);
  }

  /**
   * Performs a POST request.
   * @param {String} url    Request URL.
   * @param {Object} [data] POST request data.
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
   * @param {String} url Request URL.
   * @return {Promise}
   */
  delete(url) {
    checkUrl(url);

    const parameters = { method: 'DELETE', url };
    return this._send(parameters);
  }

  /**
   * Performs a PUT request.
   * @param {String} url    Request URL.
   * @param {Object} [data] PUT request data.
   * @return {Promise}
   */
  put(url, data) {
    checkUrl(url);

    // Validate PUT data type.
    if (data && !_.isObject(data)) {
      throw new Error('Invalid PUT data object');
    }

    const parameters = {
      method: 'PUT',
      json: true,
      body: data ? data : {},
      url,
    };

    return this._send(parameters);
  }
}

export default RequestDispatcher;
