/**
 * Requester.
 * Performs HTTP requests to a given URL.
 *
 * @example
 * 	const request = new Requester(
 * 		'http://shop.de/api.php/v2',
 * 		'admin@shop.de',
 * 		'12345'
 * 	);
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
 * 		// ....
 * 	});
 */

'use strict';

// Dependencies.
const request = require('request');
const extend = require('extend');
const Promise = require('bluebird');
const check = require('check-types');
const NoArgumentError = require('./error/NoArgumentError');
const InvalidArgumentError = require('./error/InvalidArgumentError');
const AuthenticationError = require('./error/AuthenticationError');
const RequestError = require('./error/RequestError');
const ResourceNotFoundError = require('./error/ResourceNotFoundError');
const urlFormatRegex = require('./regexContainer').urlFormat;
const messages = require('./messageContainer');

// Class definition.
class Requester {

  /**
   * Makes requests to provided URL with authentication possible.
   *
   * @param  {string} url       URL to REST-API.
   * @param  {string} user      Login user.
   * @param  {string} password  Login password.
   *
   * @example
   * 	const request = new Requester(
   * 		'http://shop.de/api.php/v2',
   * 		'admin@shop.de',
   * 		'12345'
   * 	);
   *
   */
  constructor(url, user, password) {
    // Validate arguments.
    this._validate(arguments);

    // Assign properties.
    this.url = url;
    this.user = user;
    this.password = password;
  }

  /**
   * Performs a GET request.
   * @param {object} [headers] Request HTTP headers.
   * @return {Promise}
   */
  get(headers) {
    // Check headers argument.
    if (check.assigned(headers) && check.not.object(headers)) {
      throw new InvalidArgumentError(messages.HEADERS_NOT_AN_OBJECT);
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
   * @param {array} params Constructor parameters.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(params) {
    // Shortcuts.
    const url = params[0];
    const user = params[1];
    const password = params[2];

    // Check URL.
    if (check.not.assigned(url)) {
      throw new NoArgumentError(messages.URL_MISSING);
    } else if (check.not.string(url)) {
      throw new InvalidArgumentError(messages.URL_NOT_A_STRING);
    } else if (check.not.match(url, urlFormatRegex)) {
      throw new InvalidArgumentError(messages.URL_INVALID);
    }

    // Check user.
    if (check.not.assigned(user)) {
      throw new NoArgumentError(messages.USER_MISSING);
    } else if (check.not.string(user)) {
      throw new InvalidArgumentError(messages.USER_NOT_A_STRING);
    }

    // Check password.
    if (check.not.assigned(password)) {
      throw new NoArgumentError(messages.PASSWORD_MISSING);
    } else if (check.not.string(password)) {
      throw new InvalidArgumentError(messages.PASSWORD_NOT_A_STRING);
    }
  }

  /**
   * Makes a request and returns a promise containing the response.
   * @param {object} [providedRequestParameters] Additional request parameters.
   * @throws InvalidArgumentError If argument is provided with wrong type.
   * @return {Promise}
   * @private
   */
  _performRequest(providedRequestParameters) {
    // Check provided request parameters argument.
    if (
      check.assigned(providedRequestParameters) &&
      check.not.object(providedRequestParameters)
    ) {
      throw new InvalidArgumentError(messages.ARGUMENT_NOT_AN_OBJECT);
    }

    // Default request parameters.
    const defaultRequestParameters = {
      url: this.url,
      auth: {
        user: this.user,
        pass: this.password,
      },
      headers: {
        'User-Agent': 'Node Gambio API client',
      },
    };

    // Extend default request parameters with provided ones.
    const requestParameters = extend(
      true,
      {},
      defaultRequestParameters,
      check.assigned(providedRequestParameters) ? providedRequestParameters : {}
    );

    // Promise object.
    const promise = new Promise((resolve, reject) => {
      // Perform request and handle response.
      request(requestParameters, (error, response, body) => {
        // Object of promise functions to pass it to #_handleResponse().
        const promiseFunctions = { resolve, reject };

        // Object of request's callback params to pass it to #_handleResponse().
        const responseObject = { error, response, body };

        // Call internal method to handle response and promise.
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
   * @param  {object}   responseObject            Request's callback args object.
   * @param  {Error}    [responseObject.error]    Request's error callback param.
   * @param  {object}   [responseObject.response] Request's response callback param.
   * @param  {object}   [responseObject.body]     Request's body callback param.
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
}

// Export class.
module.exports = Requester;
