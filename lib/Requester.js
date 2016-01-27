/**
 * @name Requester
 * @description Performs HTTP requests providing a simple API.
 * @example
 * 	const Requester = require('./Requester');
 *
 *	const auth = { user: 'marc', pass: '12345' };
 *
 * 	const get = request.get('http://my.secure/page', auth);
 *
 * 	get
 * 		.then(console.log)
 * 	 	.catch(console.error):
 */

'use strict';

const request = require('request');
const extend = require('extend');
const Promise = require('bluebird');
const check = require('check-types');
const errors = require('common-errors');
const HttpStatusCodes = require('http-status-codes');

const messages = require('./provider/messages');
const defaultHeaders = require('./provider/headers');
const Validator = require('./Validator');

/**
 * Class representing a requester API.
 */
class Requester {

  // TODO: Method - Implement status code lookup with respective package.
  // TODO: Method - Build custom error.
  // TODO: Method - Parse JSON reponse.

  /**
   * Checks passed arguments for their validity.
   *
   * @param {Object} parameters Object containing parameters to validate.
   *
   * @throws ArgumentNullError  If an argument is missing.
   * @throws ArgumentError      If an argument is invalid.
   *
   * @private
   * @static
   */
  static _checkArguments(parameters) {
    // Check parameters object.
    Validator.checkObject(parameters, 'Validation parameter object');

    // Check URL.
    if (check.assigned(parameters.url)) {
      Validator.checkUrl(parameters.url, 'Request URL');
    }

    // Check authentication parameters.
    if (check.assigned(parameters.auth)) {
      Validator.checkObject(parameters.auth, 'Authentication object');
      Validator.checkString(parameters.auth.user, 'Authentication user');
      Validator.checkString(parameters.auth.pass, 'Authentication password');
    }
  }

  /**
   * Performs a GET request.
   *
   * @param {String} url        Request URL.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   *
   * @return {Promise}
   * @static
   */
  static get(url, auth) {
    // Check arguments.
    this._checkArguments({ url, auth });

    // Prepare request parameters.
    const requestParameters = extend(true, {}, { method: 'GET', url, auth });

    // Return request promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a POST request.
   *
   * @param {String} url        Request URL.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   * @param {Object} [data]     POST request data.
   *
   * @return {Promise}
   * @static
   */
  static post(url, auth, data) {
    // Check arguments.
    this._checkArguments({ url, auth });

    // Check POST data.
    if (check.assigned(data)) {
      Validator.checkObject(data, 'POST request data');
    }

    // Prepare request parameters.
    const requestParameters = extend(true, {},
      { method: 'POST', json: true, body: check.assigned(data) ? data : {} }
    );

    // Return request promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a DELETE request.
   *
   * @param {String} url        Request URL.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   *
   * @return {Promise}
   * @static
   */
  static delete(url, auth) {
    // Check arguments.
    this._checkArguments({ url, auth });

    // Prepare request parameters.
    const requestParameters = extend(true, {}, { method: 'DELETE', url, auth });

    // Return request promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a PUT request.
   *
   * @param {String} url        Request URL.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   * @param {Object} [data]     PUT request data.
   *
   * @return {Promise}
   * @static
   */
  static put(url, auth, data) {
    // Check arguments.
    this._checkArguments({ url, auth });

    // Check PUT data.
    if (check.assigned(data)) {
      Validator.checkObject(data, 'PUT request data');
    }

    // Prepare request parameters.
    const requestParameters = extend(true, {},
      { method: 'PUT', json: true, body: check.assigned(data) ? data : {} }
    );

    // Return request promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Sends a request.
   * @param {Object} parameters Request parameters.
   * @return {Promise}
   * @private
   * @static
   */
  static _performRequest(parameters) {
    // Check URL and authentication parameters.
    this._checkArguments({
      url: parameters.url,
      auth: parameters.auth,
    });

    // Create request parameter object by extending
    // the default parameters with the provided ones.
    const requestParameters = extend(true, {}, defaultHeaders, parameters);

    // Create a promise.
    const promise = new Promise((resolve, reject) => {
      // Perform request.
      request(requestParameters, (error, response) => {
        this._handleResponse(resolve, reject, error, response);
      });
    });

    // Return promise.
    return promise;
  }

  /**
   * Check if the response body is in JSON format
   * and try to parse JSON to JS object if needed.
   *
   * @param {Object} response Response object.
   * @return {String|Object}
   * @private
   * @static
   */
  static _parseJsonResponse(response) {
    try {
      // Check if response contains JSON.
      if (check.not.contains(response.headers['content-type'], 'json')) {
        throw new errors.data.DataError('No JSON content');
      }

      // Parse response body from JSON to JS object.
      const data = JSON.parse(response.body);

      // Return parsed object.
      return data;
    } catch (error) {
      // Return raw response body.
      return response.body;
    }
  }

  /**
   * Processes request's response.
   *
   * Possible promise rejection errors:
   * - `ConnectionError` If the request could not be sent due to connection problems.
   *
   * @param {Function}  resolve   Promise' resolve function.
   * @param {Function}  reject    Promise' reject function.
   * @param {Error}     [error]   Error thrown by request.
   * @param {Object}    response  Server response.
   *
   * @private
   * @static
   */
  _handleResponse(resolve, reject, error, response) {
    // Check for request error and reject promise with ConnectionError.
    if (check.assigned(error)) {
      const errorToReject = new errors.ConnectionError(error.message, error);
      reject(errorToReject);
    }


    // Handle successful response.
    if (check.between(response.statusCode, 200, 299)) {
      const responseData = this._parseJsonResponse(response);
    }


    // Handle error thrown by request.
    if (check.assigned(responseObject.error)) {
      this._handleRequestError(promiseFunctions.reject, responseObject.error);
      return;
    }

    // Handle client error (HTTP status code 4xx).
    if (
      responseObject.response.statusCode >= 400 &&
      responseObject.response.statusCode < 500
    ) {
      this._handleClientErrorResponse(promiseFunctions.reject, responseObject.response);
    }

    // Handle server error (HTTP status code 5xx).
    if (
      responseObject.response.statusCode >= 500 &&
      responseObject.response.statusCode < 600
    ) {
      this._handleServerErrorResponse(promiseFunctions.reject, responseObject.response);
    }

    // Handle successful request (HTTP status code 2xx).
    if (
      responseObject.response.statusCode >= 200 &&
      responseObject.response.statusCode < 300
    ) {
      this._handleSuccessfulResponse(promiseFunctions.resolve, responseObject.response);
    }
  }

  /**
   * Handles error thrown by request module.
   *
   * @param  {function} rejectPromise Promise's reject function.
   * @param  {Error}    error         Error object.
   *
   * @private
   */
  _handleRequestError(rejectPromise, error) {
    /**
     * Build error.
     * @type {RequestError}
     */
    const requestError = this._buildError({
      type: 'request',
      data: { error },
      message: error.message,
    });

    // Reject promise.
    rejectPromise(requestError);
  }


  /**
   * Handles server response with HTTP status code 4xx.
   *
   * @param  {function} rejectPromise Promise's reject function.
   * @param  {object}   response      Server response data.
   *
   * @private
   */
  _handleClientErrorResponse(rejectPromise, response) {
    /**
     * Error message.
     * @type {string}
     */
    let message;

    /**
     * Response body is in JSON format?
     * @type {boolean}
     */
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Use message from response. Parse JSON, if needed.
    if (hasJsonResponse) {
      message = check.object(response.body) ?
        response.body.message :
        JSON.parse(response.body).message;
    }

    /**
     * Build error.
     * @type {ClientError}
     */
    const error = this._buildError({
      type: 'client',
      code: response.statusCode,
      data: { response: response.toJSON() },
      message,
    });

    // Reject promise.
    rejectPromise(error);
  }

  /**
   * Handles server response with HTTP status code 5xx.
   *
   * @param  {function} rejectPromise Promise's reject function.
   * @param  {object}   response      Server response data.
   *
   * @private
   */
  _handleServerErrorResponse(rejectPromise, response) {
    /**
     * Error message.
     * @type {string}
     */
    let message;

    /**
     * Response body is in JSON format?
     * @type {boolean}
     */
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Use message from response. Parse JSON, if needed.
    if (hasJsonResponse) {
      message = check.object(response.body) ?
        response.body.message :
        JSON.parse(response.body).message;
    }

    /**
     * Build error.
     * @type {ServerError}
     */
    const error = this._buildError({
      type: 'server',
      code: response.statusCode,
      data: { response: response.toJSON() },
      message,
    });

    // Reject promise.
    rejectPromise(error);
  }
}

module.exports = Requester;
