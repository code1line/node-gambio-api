import request from 'request';
import extend from 'extend';
import Promise from 'bluebird';
import _ from 'lodash';

/**
 * Class representing a request dispatcher.
 * @description Performs HTTP requests providing a simple API.
 * @example
 * 	import RequestDispatcher from './RequestDispatcher';
 *
 * 	const dispatcher = new RequestDispatcher({ user: 'marcus', pass: '1234' });
 *
 * 	dispatcher.get('http://my.secure/page').then(console.log);
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

    // Check passphrase.
    if (_.isNil(auth.pass) || !_.isString(auth.pass)) {
      throw new Error('Missing or invalid passphrase');
    }
  }

  /**
   * Validates an URL for its type and format validity.
   * @param {String} url Checked URL.
   * @throws {Error} On missing or invalid URL.
   * @private
   */
  _validateUrl(url) {
    /**
     * Regular expression to test the URL format against.
     *
     * Will match following cases:
     * - http://www.foufos.gr
     * - https://www.foufos.gr
     * - http://foufos.gr
     * - http://www.foufos.gr/kino
     * - http://www.t.co
     * - http://t.co
     * - http://werer.gr
     * - www.foufos.gr
     *
     * Will NOT match the following:
     * - www.foufos
     * - http://www.foufos
     * - http://foufos
     *
     * @see http://stackoverflow.com/a/17773849
     */
    const formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check type.
    if (_.isNil(url) || !_.isString(url)) {
      throw new Error('Missing or invalid URL');
    }

    // Check format.
    if (_.isNull(url.match(formatRegex))) {
      throw new Error('Invalid URL format');
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

        // Check for error status code and reject promise.
        if (_.inRange(response.statusCode, 399, 600)) {
          const serverError = new Error('Request error');
          serverError.data = data;

          reject(serverError);
          return;
        }

        // Check for successful status code and resolve promise.
        if (_.inRange(response.statusCode, 199, 300)) {
          resolve(data);
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
    this._validateUrl(url);

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
    this._validateUrl(url);

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
    this._validateUrl(url);

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
    this._validateUrl(url);

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
