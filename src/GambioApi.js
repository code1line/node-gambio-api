/**
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
 *  API.zones.getById(23).then(console.log);
 *
 * @version 2.0.0
 * @author Ronald Loyko
 * @license GPL v2
 */

import extend from 'extend';
import check from 'check-types';
import CountryApi from './api/CountryApi';
import ZoneApi from './api/ZoneApi';
import AddressApi from './api/AddressApi';
import CustomerApi from './api/CustomerApi';
import EmailApi from './api/EmailApi';

/**
 * Class representing the main Gambio API module.
 */
class GambioApi {

  /**
   * Returns the version.
   * @return {String} Current version.
   * @static
   */
  static getVersion() {
    return '2.0.0';
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
  constructor(parameters) {
    // Validates the provided parameters.
    this._validate(parameters);

    // Extend default parameters with provided ones.
    const extendedParameters = extend(true, {}, defaultParameters, parameters);

    // Compose API URL.
    const apiUrl = this._getApiUrl(extendedParameters.url, extendedParameters.version);

    // Create authentication object which is required in each sub API call.
    const apiAuth = {
      user: extendedParameters.user,
      pass: extendedParameters.pass,
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
  _getApiUrl(url, version) {
    // Relative path to API file with specific version.
    const apiUrl = `/api.php/${version}`;

    // Compose shop URL and REST-API relative path.
    const composedUrl = url + apiUrl;

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
  _validate(parameters) {
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
}

module.exports = GambioApi;
