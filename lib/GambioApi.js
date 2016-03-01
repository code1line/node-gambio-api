'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @name gambio-api.
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  API.zones.getById(23)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  	.then(console.log)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *   	.catch(console.error);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @version 1.2.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Ronald Loyko
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license GPL v2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var check = require('check-types');

var defaultParameters = require('./provider/parameters');

var Validator = require('./Validator');
var CountryApi = require('./api/CountryApi');
var ZoneApi = require('./api/ZoneApi');
var AddressApi = require('./api/AddressApi');
var CustomerApi = require('./api/CustomerApi');
var EmailApi = require('./api/EmailApi');

/**
 * Class representing the main Gambio API module.
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
      return '1.2.0';
    }

    /**
     * Creates a new instance with provided parameters.
     *
     * @param {Object} parameters           API parameters.
     * @param {String} parameters.url       URL to Gambio shop root (e.g.: 'http://shop.de/shop1').
     * @param {String} parameters.user      Login user (e.g.: 'admin@shop.de').
     * @param {String} parameters.pass      Login password (e.g.: '12345').
     * @param {String} [parameters.version] API version (e.g.: 'v2').
     */

  }]);

  function GambioApi(parameters) {
    _classCallCheck(this, GambioApi);

    // Validates the provided parameters.
    this._validate(parameters);

    // Extend default parameters with provided ones.
    var extendedParameters = (0, _extend2.default)(true, {}, defaultParameters, parameters);

    // Compose API URL.
    var apiUrl = this._getApiUrl(extendedParameters.url, extendedParameters.version);

    // Create authentication object which is required in each sub API call.
    var apiAuth = {
      user: extendedParameters.user,
      pass: extendedParameters.pass
    };

    // Set sub APIs.
    this.countries = new CountryApi(apiUrl, apiAuth);
    this.zones = new ZoneApi(apiUrl, apiAuth);
    this.addresses = new AddressApi(apiUrl, apiAuth);
    this.customers = new CustomerApi(apiUrl, apiAuth);
    this.emails = new EmailApi(apiUrl, apiAuth);
  }

  /**
   * Composes the Shop URL and the version.
   * The returned value is the composed URL, which represents the URL to the REST-API.
   *
   * @param {String} url      Object of parameters.
   * @param {String} version  URL to shop.
   *
   * @return {String}
   * @private
   */


  _createClass(GambioApi, [{
    key: '_getApiUrl',
    value: function _getApiUrl(url, version) {
      // Relative path to API file with specific version.
      var apiUrl = '/api.php/' + version;

      // Compose shop URL and REST-API relative path.
      var composedUrl = url + apiUrl;

      // Return composed URL.
      return composedUrl;
    }

    /**
     * Validates the provided parameters in constructor.
     *
     * @param {Object} parameters Constructor parameter object (see #constructor).
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @private
     */

  }, {
    key: '_validate',
    value: function _validate(parameters) {
      // Validate object parameter.
      Validator.checkObject(parameters, 'Constructor parameter');

      // Validate URL.
      Validator.checkUrl(parameters.url, 'Shop URL');

      // Validate user.
      Validator.checkString(parameters.user, 'Login user');

      // Validate password.
      Validator.checkString(parameters.pass, 'Login password');

      // Check API version, if provided.
      if (check.assigned(parameters.version)) {
        Validator.checkString(parameters.version, 'API version');
      }
    }
  }]);

  return GambioApi;
}();

module.exports = GambioApi;