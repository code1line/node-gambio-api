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
  // TODO: Method - Check arguments on methods. _checkArguments(method, arguments).
  // TODO: Method - Build custom error.
  // TODO: Method - Parse JSON reponse.

  /**
   * Checks passed arguments for their validity.
   *
   * @param  {String} method      Calling method name (e.g.: 'put').
   * @param  {Object} parameters  Argument object passed to a method.
   *
   * @throws ArgumentNullError If an argument is missing.
   * @throws ArgumentError If an argument is invalid.
   */
  static _checkArguments(method, parameters) {
    // Check parameters object.
    Validator.checkObject(parameters, 'Parameter object');

    // Check URL.
    Validator.checkUrl(parameters.url, 'Request URL');

    // Check authentication parameters.
    Validator.checkObject(parameters.auth, 'Authentication object');
    Validator.checkString(parameters.auth.user, 'Authentication user');
    Validator.checkString(parameters.auth.pass, 'Authentication password');
  }

  /**
   * Performs a GET request.
   * @param {object} [headers] Request HTTP headers.
   * @return {Promise}
   */
  get(headers) {
    // this._checkArguments();
    // Check headers argument.
    if (check.assigned(headers)) {
      /**
       * Check headers parameter.
       *
       * @throws InvalidArgumentError On invalid type of `headers` argument.
       * @throws NoArgumentError      On missing `headers` argument.
       */
      Validator.checkObject(headers, messages.HEADERS);
    }

    /**
     * Request parameters.
     * @type {object}
     */
    const requestParameters = extend(
      true,
      {},
      { method: 'GET' },
      check.assigned(headers) ? { headers } : {}
    );

    // Return promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a POST request.
   *
   * @param  {object} [data] Post data.
   *
   * @return {Promise}
   */
  post(data) {
    // Check post data argument.
    if (check.assigned(data)) {
      /**
       * Check post data parameter.
       *
       * @throws InvalidArgumentError On invalid type of `data` argument.
       * @throws NoArgumentError      On missing `data` argument.
       */
      Validator.checkObject(data, messages.POST_DATA);
    }

    /**
     * Request parameters.
     * @type {object}
     */
    const requestParameters = extend(
      true,
      {},
      { method: 'POST', json: true },
      { body: check.assigned(data) ? data : {} }
    );

    // Return promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a form submit with provided form data and request method.
   *
   * @param  {string}   method   Request method type.
   * @param  {object}   formData Form data.
   *
   * @return {Promise}
   */
  submitForm(method, formData) {
    /**
     * Check request method parameter.
     *
     * @throws InvalidArgumentError On invalid type of `method` argument.
     * @throws NoArgumentError      On missing `method` argument.
     */
    Validator.checkString(method, messages.REQUEST_METHOD);

    /**
     * Check request form data parameter.
     *
     * @throws InvalidArgumentError On invalid type of `formData` argument.
     * @throws NoArgumentError      On missing `formData` argument.
     */
    Validator.checkObject(formData, messages.FORM_DATA);

    /**
     * Request parameters.
     * @type {object}
     */
    const requestParameters = extend(true, {}, { method, formData });

    // Return promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a DELETE request.
   *
   * @return {Promise}
   */
  delete() {
    /**
     * Request parameters.
     * @type {object}
     */
    const requestParameters = extend(true, {}, { method: 'DELETE' });

    // Return promise.
    return this._performRequest(requestParameters);
  }

  /**
   * Performs a PUT request.
   *
   * @param  {object} [data] Post data.
   *
   * @return {Promise}
   */
  put(data) {
    // Check put data argument.
    if (check.assigned(data)) {
      /**
       * Check request data parameter.
       *
       * @throws InvalidArgumentError On invalid type of `data` argument.
       * @throws NoArgumentError      On missing `data` argument.
       */
      Validator.checkObject(data, messages.PUT_DATA);
    }

    /**
     * Request parameters.
     * @type {object}
     */
    const requestParameters = extend(
      true,
      {},
      { method: 'PUT', json: true },
      { body: check.assigned(data) ? data : {} }
    );

    // Return promise.
    return this._performRequest(requestParameters);
  }


  /**
   * Makes a request and returns a promise containing the response.
   *
   * @param {object} [customParameters] Additional request parameters.
   *
   * @throws InvalidArgumentError If optional argument is provided with wrong type.
   *
   * @return {Promise}
   *
   * @private
   */
  _performRequest(customParameters) {
    // Check custom request parameters, if provided.
    if (check.assigned(customParameters)) {
      /**
       * Check custom parameter.
       * @throws InvalidArgumentError On invalid type of `customParameters` argument.
       */
      Validator.checkObject(customParameters);
    }

    /**
     * Extend default request parameters with provided custom ones.
     * @type {object}
     */
    const requestParameters = extend(
      true,
      {},
      this._getDefaultRequestParameters(),
      check.assigned(customParameters) ? customParameters : {}
    );

    /**
     * Create a new promise.
     * @type {Promise}
     */
    const promise = new Promise((resolve, reject) => {
      // Perform request and handle response.
      request(requestParameters, (error, response) => {
        // Object of promise functions.
        const promiseFunctions = { resolve, reject };

        // Object of request's callback parameters.
        const responseObject = { error, response };

        // Call method to handle response and resolve/reject the promise.
        this._handleResponse(promiseFunctions, responseObject);
      });
    });

    // Return promise.
    return promise;
  }

  /**
   * Handles request's response and rejects/resolves the promise.
   *
   * @param  {object}   promiseFunctions          Promise functions object.
   * @param  {function} promiseFunctions.resolve  Promise's resolve function.
   * @param  {function} promiseFunctions.reject   Promise's reject function.
   *
   * @param  {object}   responseObject            Request's callback args object.
   * @param  {Error}    [responseObject.error]    Request's error callback param.
   * @param  {object}   responseObject.response   Request's response callback param.
   * @param  {object}   responseObject.body       Request's body callback param.
   *
   * @private
   */
  _handleResponse(promiseFunctions, responseObject) {
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

  /**
   * Handles successful server responses with HTTP status code 2xx.
   *
   * @param  {function} rejectPromise Promise's reject function.
   * @param  {object}   response      Server response data.
   *
   * @private
   */
  _handleSuccessfulResponse(resolvePromise, response) {
    /**
     * Response data.
     * @type {*}
     */
    let data;

    /**
     * Response body is in JSON format?
     * @type {boolean}
     */
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Parse JSON, if needed.
    if (hasJsonResponse) {
      data = check.object(response.body) ? response.body : JSON.parse(response.body);
    }

    // Resolve promise.
    resolvePromise(data);
  }
}

module.exports = Requester;
