'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _checkUrl = require('./helper/checkUrl');

var _checkUrl2 = _interopRequireDefault(_checkUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a request dispatcher.
 * @description Performs HTTP requests providing a simple API.
 * @example
 *  import RequestDispatcher from './RequestDispatcher';
 *  const dispatcher = new RequestDispatcher({ user: 'marcus', pass: '1234' });
 *  dispatcher.get('http://my.secure/page').then(console.log);
 *
 */

var RequestDispatcher = function () {

  /**
   * Creates an instance of request dispatcher.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */

  function RequestDispatcher(auth) {
    _classCallCheck(this, RequestDispatcher);

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


  _createClass(RequestDispatcher, [{
    key: '_validateCredentials',
    value: function _validateCredentials(auth) {
      // Check object.
      if (_lodash2.default.isNil(auth) || !_lodash2.default.isObject(auth)) {
        throw new Error('Missing or invalid authentication object');
      }

      // Check user.
      if (_lodash2.default.isNil(auth.user) || !_lodash2.default.isString(auth.user)) {
        throw new Error('Missing or invalid user');
      }

      // Check password.
      if (_lodash2.default.isNil(auth.pass) || !_lodash2.default.isString(auth.pass)) {
        throw new Error('Missing or invalid password');
      }
    }

    /**
     * Sends a request and handles the response.
     * @param {Object} parameters Request parameters.
     * @return {Promise}
     * @private
     */

  }, {
    key: '_send',
    value: function _send(parameters) {
      // Default request parameters.
      var defaults = {
        headers: { 'User-Agent': 'Node Gambio API client' },
        auth: this.auth
      };

      // Extend default parameters with provided ones.
      var requestParameters = (0, _extend2.default)(true, {}, defaults, parameters);

      // Return a new promise and perform the request.
      return new _bluebird2.default(function (resolve, reject) {
        // Response data.
        var data = undefined;

        (0, _request2.default)(requestParameters, function (error, response) {
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
          if (_lodash2.default.inRange(response.statusCode, 199, 300)) {
            resolve(data);
            return;
          }

          // Check for error/redirection status code and reject promise.
          if (_lodash2.default.inRange(response.statusCode, 300, 600)) {
            var serverError = new Error('Server responded with error or redirection');
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

  }, {
    key: 'get',
    value: function get(url, queryString) {
      (0, _checkUrl2.default)(url);

      if (queryString && !_lodash2.default.isObject(queryString)) {
        throw new Error('Invalid GET query string parameters.');
      }

      var parameters = { method: 'GET', url: url };

      if (queryString) {
        (0, _extend2.default)(parameters, { qs: queryString });
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

  }, {
    key: 'post',
    value: function post(url, data) {
      (0, _checkUrl2.default)(url);

      // Validate POST data type.
      if (data && !_lodash2.default.isObject(data)) {
        throw new Error('Invalid POST data object');
      }

      var parameters = {
        method: 'POST',
        json: true,
        body: data ? data : {},
        url: url
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

  }, {
    key: 'delete',
    value: function _delete(url, data) {
      (0, _checkUrl2.default)(url);

      if (data && !_lodash2.default.isObject(data)) {
        throw new Error('Invalid DELETE data parameter.');
      }

      var parameters = { method: 'DELETE', url: url };

      if (data) {
        (0, _extend2.default)(parameters, { json: true, body: data });
      }

      return this._send(parameters);
    }

    /**
     * Performs a PUT request.
     * @param {String} url    Request URL.
     * @param {Object} [data] PUT request data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'put',
    value: function put(url, data) {
      (0, _checkUrl2.default)(url);

      // Validate PUT data type.
      if (data && !_lodash2.default.isObject(data)) {
        throw new Error('Invalid PUT data object');
      }

      var parameters = {
        method: 'PUT',
        json: true,
        body: data ? data : {},
        url: url
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

  }, {
    key: 'uploadFile',
    value: function uploadFile(url, path, name, fieldNames) {
      (0, _checkUrl2.default)(url);

      // Validate file path.
      if (_lodash2.default.isNil(path) || !_lodash2.default.isString(path)) {
        throw new Error('Missing or invalid file path');
      }

      // Validate file name.
      if (_lodash2.default.isNil(name) || !_lodash2.default.isString(name)) {
        throw new Error('Missing or invalid file name');
      }

      // Validate field names.
      if (fieldNames && !_lodash2.default.isArray(fieldNames)) {
        throw new Error('Invalid fieldnames array');
      }

      // Read file.
      var file = _fs2.default.createReadStream(path);
      // Field names
      var fileFieldname = fieldNames ? fieldNames[0] : 'file';
      var nameFieldname = fieldNames ? fieldNames[1] : 'filename';

      // Form data.
      var data = {};

      data[fileFieldname] = file;
      data[nameFieldname] = name;

      var parameters = {
        method: 'POST',
        formData: data,
        url: url
      };

      return this._send(parameters);
    }
  }]);

  return RequestDispatcher;
}();

exports.default = RequestDispatcher;