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
const AuthenticationError = require('./error/AuthenticationError');
const RequestError = require('./error/RequestError');
const ResourceNotFoundError = require('./error/ResourceNotFoundError');
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
   * @return {Promise}
   */
  get(headers) {
    // Check headers argument.
    if (check.assigned(headers)) {
      Validator.checkObjectParameter(headers, messages.HEADERS);
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

  post() {}

  delete() {}

  put() {}

  upload() {}

  /**
   * Validates credentials.
   *
   * @param {object} parameters Constructor parameter.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(parameters) {
    // Check object parameter.
    Validator.checkObjectParameter(parameters);

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
   * @private
   */
  _performRequest(customParameters) {
    // Check custom request parameters, if provided.
    if (check.assigned(customParameters)) {
      Validator.checkObjectParameter(customParameters);
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
      request(requestParameters, (error, response, body) => {
        // Object of promise functions.
        const promiseFunctions = { resolve, reject };

        // Object of request's callback parameters.
        const responseObject = { error, response, body };

        // Call method to handle response and resolve/reject the promise.
        this._handleResponse(promiseFunctions, responseObject);
      });
    });

    // Return promise.
    return promise;
  }

  /**
   * Handles request's response and
   * rejects/resolves the promise by calling the function provided as params.
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
    // Check for error thrown by request.
    if (responseObject.error) {
      const error = new RequestError(responseObject.error.message);
      error.data = responseObject.error;

      promiseFunctions.reject(error);
      return;
    }

    // Check for authentication error.
    if (responseObject.response.statusCode === 401) {
      // Create new error, attach JSON response data and reject promise.
      const error = new AuthenticationError(messages.INVALID_CREDENTIALS);
      error.data = responseObject.body;

      promiseFunctions.reject(error);
      return;
    }

    // Check for not found error.
    if (responseObject.response.statusCode === 404) {
      // Create new error, attach JSON response data and reject promise.
      const error = new ResourceNotFoundError(messages.RESOURCE_NOT_FOUND);
      error.data = responseObject.body;

      promiseFunctions.reject(error);
      return;
    }

    // Check for internal server error.
    if (responseObject.response.statusCode === 500) {
      // Create new error, attach JSON response data and reject promise.
      const error = new RequestError(messages.INTERNAL_SERVER_ERROR);
      error.data = responseObject.body;

      promiseFunctions.reject(error);
      return;
    }

    // Check for successful request.
    if (
      responseObject.response.statusCode >= 200 &&
      responseObject.response.statusCode < 300
    ) {
      const response = JSON.parse(responseObject.body);
      promiseFunctions.resolve(response);
    }
  }

  /**
   * Returns the default request parameters.
   *
   * @return {object} Default request parameters.
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
