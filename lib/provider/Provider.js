'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _RequestDispatcher = require('./../RequestDispatcher');

var _RequestDispatcher2 = _interopRequireDefault(_RequestDispatcher);

var _checkUrl = require('./../helper/checkUrl');

var _checkUrl2 = _interopRequireDefault(_checkUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing a base provider.
 * @description Provider base class. Meant to be extended by other provider classes.
 * @example
 * 	class myProvider extends Provider {
 * 		_getSuffix() {
 * 			return '/subroute/to/api';
 * 		}
 * 	}
 *
 * 	const instanceOfmyProvider = new myProvider({
 * 		url: 'http://mysite.com/api/v2',
 * 		user: 'user',
 * 		pass: 'password',
 * 	});
 */

var Provider = function () {
  /**
   * Creates a base provider instance and initializes a request dispatcher.
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */

  function Provider(url, auth) {
    _classCallCheck(this, Provider);

    this._validateParameters(url, auth);

    this.url = url;
    this.auth = auth;

    this.dispatcher = new _RequestDispatcher2.default(auth);
  }

  /**
   * Returns the API endpoint URL suffix.
   * Note, that this method has to be implented in subclasses like this:
   *   _getSuffix() {
   *   		return '/myroute';
   *   }
   * @return {String}
   * @throws {Error} If method has not been overridden.
   * @override
   * @private
   */


  _createClass(Provider, [{
    key: '_getSuffix',
    value: function _getSuffix() {
      throw new Error('_getSuffix method is not implemented');
    }

    /**
     * Returns the complete URL to API endpoint.
     * @return {String}
     * @private
     */

  }, {
    key: '_getEndpointUrl',
    value: function _getEndpointUrl() {
      return this.url + this._getSuffix();
    }

    /**
     * Returns the provided authentication credentials object.
     * @return {Object}
     * @private
     */

  }, {
    key: '_getAuth',
    value: function _getAuth() {
      return this.auth;
    }

    /**
     * Validates the provided constructor parameters.
     * @param {String} url        URL to REST-API.
     * @param {Object} auth       Authentication credentials.
     * @throws {Error} On missing or invalid parameters.
     * @private
     */

  }, {
    key: '_validateParameters',
    value: function _validateParameters(url, auth) {
      // Check URL.
      (0, _checkUrl2.default)(url);

      // Check authentication object.
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
  }]);

  return Provider;
}();

exports.default = Provider;