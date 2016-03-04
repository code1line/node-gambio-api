'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _CountryProvider = require('./provider/CountryProvider');

var _CountryProvider2 = _interopRequireDefault(_CountryProvider);

var _ZoneProvider = require('./provider/ZoneProvider');

var _ZoneProvider2 = _interopRequireDefault(_ZoneProvider);

var _AddressProvider = require('./provider/AddressProvider');

var _AddressProvider2 = _interopRequireDefault(_AddressProvider);

var _CustomerProvider = require('./provider/CustomerProvider');

var _CustomerProvider2 = _interopRequireDefault(_CustomerProvider);

var _EmailProvider = require('./provider/EmailProvider');

var _EmailProvider2 = _interopRequireDefault(_EmailProvider);

var _CategoryProvider = require('./provider/CategoryProvider');

var _CategoryProvider2 = _interopRequireDefault(_CategoryProvider);

var _OrderProvider = require('./provider/OrderProvider');

var _OrderProvider2 = _interopRequireDefault(_OrderProvider);

var _ProductProvider = require('./provider/ProductProvider');

var _ProductProvider2 = _interopRequireDefault(_ProductProvider);

var _checkUrl = require('./helper/checkUrl');

var _checkUrl2 = _interopRequireDefault(_checkUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing the main Gambio API module.
 *
 * @description Simple API for Node, that performs requests to the integrated REST-API of Gambio.
 * @example
 * 	const GambioApi = require('gambio-api');
 *
 *  const API = new GambioApi({
 *  	url: 'http://shop.com',
 *  	user: 'admin@shop.com',
 *  	pass: '12345',
 *  });
 *
 *  // Get version.
 *  GambioApi.getVersion();
 *
 *  // Get a zone.
 *  API.zones.getById(23).then(console.log);
 *
 * @version 2.0.0
 * @author Ronald Loyko
 * @license GPL v2
 */

var GambioApi = function () {
  _createClass(GambioApi, null, [{
    key: 'getVersion',


    /**
     * Returns the version.
     * @return {String} Current version.
     * @static
     */
    value: function getVersion() {
      return '2.0.0';
    }

    /**
     * Creates a new instance of the API client.
     * @param {Object} parameters           Parameters object.
     * @param {String} parameters.url       URL to Gambio shop root (e.g.: 'http://shop.de/shop1').
     * @param {String} parameters.user      Login user (e.g.: 'admin@shop.de').
     * @param {String} parameters.pass      Login password (e.g.: '12345').
     */

  }]);

  function GambioApi(parameters) {
    _classCallCheck(this, GambioApi);

    // Validate parameters.
    this._validateParameters(parameters);

    // Compose REST-API URL.
    var url = parameters.url + '/api.php/v2';

    // Authentication object which is required for each provider.
    var auth = {
      user: parameters.user,
      pass: parameters.pass
    };

    // Set providers.
    this.countries = new _CountryProvider2.default(url, auth);
    this.zones = new _ZoneProvider2.default(url, auth);
    this.addresses = new _AddressProvider2.default(url, auth);
    this.customers = new _CustomerProvider2.default(url, auth);
    this.emails = new _EmailProvider2.default(url, auth);
    this.categories = new _CategoryProvider2.default(url, auth);
    this.orders = new _OrderProvider2.default(url, auth);
    this.products = new _ProductProvider2.default(url, auth);
  }

  /**
   * Validates the provided parameters in constructor.
   * @see #constructor for parameters.
   * @throws {Error} On missing or invalid parameters.
   * @private
   */


  _createClass(GambioApi, [{
    key: '_validateParameters',
    value: function _validateParameters(parameters) {
      // Check object.
      if (_lodash2.default.isNil(parameters) || !_lodash2.default.isObject(parameters)) {
        throw new Error('Missing or invalid parameter object');
      }

      // Check URL.
      (0, _checkUrl2.default)(parameters.url);

      // Check user.
      if (_lodash2.default.isNil(parameters.user) || !_lodash2.default.isString(parameters.user)) {
        throw new Error('Missing or invalid user');
      }

      // Check password.
      if (_lodash2.default.isNil(parameters.pass) || !_lodash2.default.isString(parameters.pass)) {
        throw new Error('Missing or invalid password');
      }
    }
  }]);

  return GambioApi;
}();

exports.default = GambioApi;