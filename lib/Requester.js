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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var request = require('request');
var extend = require('extend');
var Promise = require('bluebird');
var check = require('check-types');
var errors = require('common-errors');
var HttpStatusCodes = require('http-status-codes');

var defaultHeaders = require('./provider/headers');
var Validator = require('./Validator');

/**
 * Class representing a requester API.
 */

var Requester = function () {
  function Requester() {
    _classCallCheck(this, Requester);
  }

  _createClass(Requester, null, [{
    key: 'get',

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
    value: function get(url, auth) {
      // Check arguments.
      this._checkArguments({ url: url, auth: auth });

      // Prepare request parameters.
      var requestParameters = extend(true, {}, { method: 'GET', url: url, auth: auth });

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

  }, {
    key: 'post',
    value: function post(url, auth, data) {
      // Check arguments.
      this._checkArguments({ url: url, auth: auth });

      // Check POST data.
      if (check.assigned(data)) {
        Validator.checkObject(data, 'POST request data');
      }

      // Prepare request parameters.
      var requestParameters = extend(true, {}, {
        method: 'POST',
        json: true,
        body: check.assigned(data) ? data : {},
        url: url,
        auth: auth
      });

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

  }, {
    key: 'delete',
    value: function _delete(url, auth) {
      // Check arguments.
      this._checkArguments({ url: url, auth: auth });

      // Prepare request parameters.
      var requestParameters = extend(true, {}, { method: 'DELETE', url: url, auth: auth });

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

  }, {
    key: 'put',
    value: function put(url, auth, data) {
      // Check arguments.
      this._checkArguments({ url: url, auth: auth });

      // Check PUT data.
      Validator.checkObject(data, 'PUT request data');

      // Prepare request parameters.
      var requestParameters = extend(true, {}, {
        method: 'PUT',
        json: true, body: check.assigned(data) ? data : {},
        url: url,
        auth: auth
      });

      // Return request promise.
      return this._performRequest(requestParameters);
    }

    /**
     * Checks passed arguments for their validity.
     *
     * @param {Object} parameters             Object containing parameters to validate.
     * @param {String} [parameters.url]       URL.
     * @param {Object} [parameters.auth]      Authentication credentials.
     * @param {String} [parameters.auth.user] Login user.
     * @param {String} [parameters.auth.pass] Login password.
     *
     * @throws ArgumentNullError  If an argument is missing.
     * @throws ArgumentError      If an argument is invalid.
     *
     * @private
     * @static
     */

  }, {
    key: '_checkArguments',
    value: function _checkArguments(parameters) {
      // Check parameters object.
      Validator.checkObject(parameters, 'Validation parameter object');

      // Check URL.
      Validator.checkUrl(parameters.url, 'Request URL');

      // Check authentication parameters.
      Validator.checkObject(parameters.auth, 'Authentication object');
      Validator.checkString(parameters.auth.user, 'Authentication user');
      Validator.checkString(parameters.auth.pass, 'Authentication password');
    }

    /**
     * Sends a request.
     *
     * @param {Object} parameters Request parameters.
     * @return {Promise}
     * @private
     * @static
     */

  }, {
    key: '_performRequest',
    value: function _performRequest(parameters) {
      var _this = this;

      // Check URL and authentication parameters.
      this._checkArguments({
        url: parameters.url,
        auth: parameters.auth
      });

      // Create request parameter object by extending
      // the default parameters with the provided ones.
      var requestParameters = extend(true, {}, defaultHeaders, parameters);

      // Create a promise.
      var promise = new Promise(function (resolve, reject) {
        // Perform request.
        request(requestParameters, function (error, response) {
          _this._processResponse(resolve, reject, error, response);
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

  }, {
    key: '_parseJsonResponse',
    value: function _parseJsonResponse(response) {
      try {
        // Check if response contains JSON.
        if (check.not.contains(response.headers['content-type'], 'json')) {
          throw new errors.data.DataError('No JSON content');
        }

        // Parse response body from JSON to JS object.
        var data = JSON.parse(response.body);

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
     * @see #_handleErrorResponse For more possible promise rejection errors.
     *
     * @param {Function}  resolve   Promise' resolve function.
     * @param {Function}  reject    Promise' reject function.
     * @param {Error}     [error]   Error thrown by request.
     * @param {Object}    response  Server response.
     *
     * @private
     * @static
     */

  }, {
    key: '_processResponse',
    value: function _processResponse(resolve, reject, error, response) {
      // Check for request error and reject promise with ConnectionError.
      if (check.assigned(error)) {
        // Create ConnectionError and reject promise.
        var errorToReject = new errors.ConnectionError(error.message, error);
        reject(errorToReject);
        return;
      }

      // Handle successful response.
      if (check.inRange(response.statusCode, 200, 299)) {
        // Try to parse JSON response body to JS object and resolve promise.
        var responseData = this._parseJsonResponse(response);
        resolve(responseData);
        return;
      }

      // Handle error response.
      if (check.inRange(response.statusCode, 400, 599) || response.statusCode === 0) {
        this._handleErrorResponse(reject, response);
        return;
      }
    }

    /**
     * Handles server error responses with HTTP status code 400-599.
     * Creates a new error and rejects promise with the created error object.
     *
     * @param {Function}  reject    Promise' reject function.
     * @param {Object}    response  Server response.
     *
     * @see #_generateErrorObject For possible promise rejection errors.
     *
     * @private
     * @static
     */

  }, {
    key: '_handleErrorResponse',
    value: function _handleErrorResponse(reject, response) {
      // Generate new error object.
      var error = this._generateErrorObject(response);

      // Reject promise with generated error.
      reject(error);
    }

    /**
     * Generates an custom error object based on the HTTP status code.
     *
     * Possible error objects:
     * - `InvalidOperationError` on '400 Bad Request' response.
     * - `AuthenticationRequiredError` on '401 Unauthorized' response.
     * - `NotPermittedError` on '403 Forbidden' response.
     * - `NotFoundError` on '404 Not Found' response.
     * - `NotSupportedError` on '415 Unsupported Media Type' response.
     * - `Error` on '500 Internal Server Error' response.
     * - `NotImplementedError` on '501 Not Implemented' response.
     * - `HttpStatusError` on all other responses.
     *
     * @param {Object} response Response data.
     * @return {Error}
     * @private
     * @static
     */

  }, {
    key: '_generateErrorObject',
    value: function _generateErrorObject(response) {
      // Error object.
      var error = undefined;

      // Error message.
      var message = undefined;

      // Response body as JSON.
      var responseInJson = this._parseJsonResponse(response);

      // Error class map.
      var errorMap = {
        400: errors.InvalidOperationError,
        401: errors.AuthenticationRequiredError,
        403: errors.NotPermittedError,
        404: errors.NotFoundError,
        415: errors.NotSupportedError,
        500: errors.Error,
        501: errors.NotImplementedError
      };

      // Try to determine error message based on the status code.
      if (check.assigned(HttpStatusCodes[response.statusCode])) {
        message = HttpStatusCodes[response.statusCode];
      } else {
        message = check.object(responseInJson) && check.assigned(responseInJson.message) ? responseInJson.message : 'Error';
      }

      // Build error object.
      error = check.assigned(errorMap[response.statusCode]) ? new errorMap[response.statusCode](message) : new errors.HttpStatusError(response.statusCode, message);

      // Attach response data to error object.
      error.data = responseInJson;

      // Return generated error object.
      return error;
    }
  }]);

  return Requester;
}();

module.exports = Requester;