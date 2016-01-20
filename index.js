/**
 * gambio-api.
 *
 * Simple API for Node, that performs requests to the integrated REST-API of Gambio web shops.
 *
 * @example
 * 	const validUrl = 'http://my-shop.de';
 * 	const anotherValidUrl = 'https://mypage.de/shop';
 *
 * 	const validUser = 'admin@shop.de';
 * 	const validPass = '12345';
 *
 * 	// Compose server parameters.
 *  const credentials = {
 *  	url: validUrl,
 *  	user: validUser,
 *  	pass: validPass,
 *  };
 *
 * 	// Create API instance.
 *  const API = new GambioApi(credentials);
 *
 * 	// Get zone with ID 23.
 *  API.zones.getById(23)
 *  	.then(console.log)
 *   	.catch(console.error);
 *
 * @version 0.1.1
 * @author Ronald Loyko
 * @license GPL v2
 */

'use strict';

// Node module dependencies.
const extend = require('extend');

// Libary dependencies.
const Validator = require('./lib/Validator');
const CountryApi = require('./lib/api/CountryApi');
const ZoneApi = require('./lib/api/ZoneApi');
const AddressApi = require('./lib/api/AddressApi');
const CustomerApi = require('./lib/api/CustomerApi');
const EmailApi = require('./lib/api/EmailApi');

// Class definition.
class GambioApi {

  /**
   * Creates a Gambio API instance with provided parameters.
   *
   * @param  {object} parameters                  API parameters.
   * @param  {string} parameters.url              URL to Gambio shop root.
   * @param  {string} parameters.user             Login user.
   * @param  {string} parameters.pass             Login password.
   * @param  {string} [parameters.version = 'v2'] API version.
   */
  constructor(parameters) {
    // Validate API parameters.
    this._validate(parameters);

    // Extend default parameters with provided ones
    // and set parameters as property.
    this.parameters = extend(true, {}, this._getDefaultParameters(), parameters);

    // Get REST-API URL of the shop and set it as property.
    this.apiUrl = this._getApiUrl({
      url: this.parameters.url,
      version: this.parameters.version,
    });

    // Set API credentials which will be used as constructor parameters for APIs.
    const apiCredentials = {
      url: this.apiUrl,
      user: this.parameters.user,
      pass: this.parameters.pass,
    };

    // Set APIs.
    this.countries = new CountryApi(apiCredentials);
    this.zones = new ZoneApi(apiCredentials);
    this.addresses = new AddressApi(apiCredentials);
    this.customers = new CustomerApi(apiCredentials);
    this.emails = new EmailApi(apiCredentials);
  }

  /**
   * Returns default API parameters.
   *
   * @return {object} Default API parameters.
   * @private
   */
  _getDefaultParameters() {
    // Default parameters.
    const defaultParameters = {
      version: 'v2',
    };

    // Return parameters.
    return defaultParameters;
  }

  /**
   * Returns the URL to the REST-API.
   *
   * @param {object} parameters         Object of parameters.
   * @param {string} parameters.url     URL to Gambio shop.
   * @param {string} parameters.version API version.
   *
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   *
   * @return {string} URL of the REST-API.
   * @private
   */
  _getApiUrl(parameters) {
    // Validate object parameter.
    Validator.checkObject(parameters);

    // Validate URL.
    Validator.checkUrl(parameters.url);

    // Check version.
    Validator.checkVersion(parameters.version);

    // Relative path to API file with specific version.
    const apiUrl = `/api.php/${parameters.version}`;

    // Compose shop main URL with REST-API URL.
    const composedUrl = parameters.url + apiUrl;

    // Return composed URL.
    return composedUrl;
  }

  /**
   * Validates the provided parameters in constructor.
   *
   * @param {object} parameters Constructor parameter object.
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

    // Check API version, if provided.
    if (parameters.version) Validator.checkVersion(parameters.version);
  }
}

// Export class.
module.exports = GambioApi;
