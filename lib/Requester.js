/**
 * Requester.
 * Performs HTTP requests to a given URL.
 *
 * @example
 * 	const credentials = {
 *  	url: 'http://www.myshop.com/api/customers/24',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 * 	const request = new Requester(credentials);
 *
 * // Returns Promise.
 * const get = request.get();
 *
 * // Promise handling.
 * get
 * 	.then(function () {
 * 		// ...
 * 	})
 * 	.catch(function () {
 * 		// ...
 * 	});
 */

'use strict';

// Node module dependencies.
const request = require('request');
const extend = require('extend');
const Promise = require('bluebird');
const check = require('check-types');

// Library dependencies.
const ServerError = require('./error/ServerError');
const RequestError = require('./error/RequestError');
const InvalidArgumentError = require('./error/InvalidArgumentError');
const ClientError = require('./error/ClientError');
const messages = require('./messageContainer');
const Validator = require('./Validator');

// Class definition.
class Requester {

  /**
   * Makes requests to provided URL with authentication possible.
   *
   * @param  {string} parameters        Server parameters.
   * @param  {string} parameters.url    URL REST-API endpoint.
   * @param  {string} parameters.user   Authentication user.
   * @param  {string} parameters.pass   Authentication password.
   */
  constructor(parameters) {
    // Validate parameters.
    this._validate(parameters);

    // Set URL to endpoint as property.
    this.url = parameters.url;

    // Set authentication credentials as property.
    this.auth = {
      user: parameters.user,
      pass: parameters.pass,
    };
  }

  /**
   * Performs a GET request.
   *
   * @param {object} [headers] Request HTTP headers.
   *
   * @return {Promise}
   */
  get(headers) {
    // Check headers argument.
    if (check.assigned(headers)) {
      Validator.checkObject(headers, messages.HEADERS);
    }

    // Request parameters.
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
      Validator.checkObject(data, messages.POST_DATA);
    }

    // Request parameters.
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
   * @return {Promise}
   */
  submitForm(method, formData) {
    // Check method argument.
    Validator.checkString(method, messages.REQUEST_METHOD);

    // Check form data argument.
    Validator.checkObject(formData, messages.FORM_DATA);

    // Request parameters.
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
    // Request parameters.
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
      Validator.checkObject(data, messages.PUT_DATA);
    }

    // Request parameters.
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
   * Validates credentials.
   *
   * @param {object} parameters Constructor parameter.
   *
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   *
   * @private
   */
  _validate(parameters) {
    // Check object parameter.
    Validator.checkObject(parameters);

    // Check URL.
    Validator.checkUrl(parameters.url);

    // Check user.
    Validator.checkUser(parameters.user);

    // Check password.
    Validator.checkPassword(parameters.pass);
  }

  /**
   * Makes a request and returns a promise containing the response.
   *
   * @param {object} [customParameters] Additional request parameters.
   * @throws InvalidArgumentError If optional argument is provided with wrong type.
   * @return {Promise}
   *
   * @private
   */
  _performRequest(customParameters) {
    // Check custom request parameters, if provided.
    if (check.assigned(customParameters)) {
      Validator.checkObject(customParameters);
    }

    // Extend default request parameters with provided custom ones.
    const requestParameters = extend(
      true,
      {},
      this._getDefaultRequestParameters(),
      check.assigned(customParameters) ? customParameters : {}
    );

    // Create new promise object.
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
    // Build error.
    const requestError = this._buildError({
      type: 'request',
      data: { error },
      message: error.message,
    });

    // Reject promise.
    rejectPromise(requestError);
  }

  /**
   * Builds and returns error object.
   *
   * @param  {object}   parameters          Error building details.
   * @param  {string}   parameters.type     Error type ('request', 'client', 'server').
   * @param  {integer}  [parameters.code]   Error code.
   * @param  {string}   parameters.message  Error message.
   * @param  {object}   parameters.data     Response data.
   *
   * @throws InvalidArgumentError           On invalid error type provided.
   * @return {Error}                        Created error.
   *
   * @private
   */
  _buildError(parameters) {
    // Check error details object.
    Validator.checkObject(parameters);

    // Check error type.
    Validator.checkString(parameters.type, 'Error type');

    // Check error code.
    if (check.not.contains(parameters.type, 'request')) {
      Validator.checkNumber(parameters.code, 'Error code');
    }

    // Check error message.
    Validator.checkString(parameters.message, 'Error message');

    // Check response data object.
    Validator.checkObject(parameters.data, 'Response data');

    // Error variable.
    let error;

    // Create error object.
    switch (parameters.type) {
      case 'request':
        error = new RequestError(parameters.message);
        break;
      case 'client':
        error = new ClientError(parameters.message);
        break;
      case 'server':
        error = new ServerError(parameters.message);
        break;
      default:
        throw new InvalidArgumentError(`Error type ${messages.IS_INVALID}`);
    }

    // Set error details.
    if (parameters.code) error.code = parameters.code;

    // Set response data.
    error.data = parameters.data;

    // Return created error.
    return error;
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
    // Message variable.
    let message;

    // Indicator, if response body is in JSON format.
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Use message from response. Parse JSON, if needed.
    if (hasJsonResponse) {
      message = check.object(response.body) ?
        response.body.message :
        JSON.parse(response.body).message;
    }

    // Build error.
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
    // Message variable.
    let message;

    // Indicator, if response body is in JSON format.
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Use message from response. Parse JSON, if needed.
    if (hasJsonResponse) {
      message = check.object(response.body) ?
        response.body.message :
        JSON.parse(response.body).message;
    }

    // Build error.
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
    // Response data (parsed), which will be attached to resolved promise.
    let data;

    // Indicator, if response body is in JSON format.
    const hasJsonResponse = check.contains(response.headers['content-type'], 'json');

    // Parse JSON, if needed.
    if (hasJsonResponse) {
      data = check.object(response.body) ? response.body : JSON.parse(response.body);
    }

    // Resolve promise.
    resolvePromise(data);
  }

  /**
   * Returns the default request parameters.
   *
   * @return {object} Default request parameters.
   *
   * @private
   */
  _getDefaultRequestParameters() {
    // Default request parameters.
    const defaultParameters = {
      url: this.url,
      auth: this.auth,
      headers: {
        'User-Agent': 'Node Gambio API client',
      },
    };

    // Return parameters.
    return defaultParameters;
  }
}

// Export class.
module.exports = Requester;
