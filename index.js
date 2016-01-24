/**
 * @name gambio-api.
 *
 * @description Simple API for Node, that performs requests to the integrated REST-API of Gambio.
 *
 * @example
 *  const API = new GambioApi({
 *  	url: 'http://shop.com',
 *  	user: 'admin@shop.com',
 *  	pass: '12345',
 *  });
 *
 *  API.zones.getById(23)
 *  	.then(console.log)
 *   	.catch(console.error);
 *
 * @version 0.1.1
 *
 * @author Ronald Loyko
 *
 * @license GPL v2
 */

'use strict';

const extend = require('extend');

const Validator = require('./lib/Validator');
const CountryApi = require('./lib/api/CountryApi');
const ZoneApi = require('./lib/api/ZoneApi');
const AddressApi = require('./lib/api/AddressApi');
const CustomerApi = require('./lib/api/CustomerApi');
const EmailApi = require('./lib/api/EmailApi');

/**
 * Class representing the main Gambio API.
 */
class GambioApi {
  /**
   * Creates a new instance with provided parameters.
   *
   * @param {object} parameters                  API parameters.
   * @param {string} parameters.url              URL to Gambio shop root (e.g.: 'http://shop.de/shop1').
   * @param {string} parameters.user             Login user (e.g.: 'admin@shop.de').
   * @param {string} parameters.pass             Login password (e.g.: '12345').
   * @param {string} [parameters.version = 'v2'] API version (e.g.: 'v3').
   */
  constructor(parameters) {
    /**
     * Validates the provided parameters.
     *
     * @throws NoArgumentError      On missing parameters.
     * @throws InvalidArgumentError On invalid arguments provided.
     */
    this._validate(parameters);

    /**
     * Extend default parameters with provided ones and sets it as property.
     *
     * @property {object} parameters           API parameters.
     * @property {string} parameters.url       Shop URL.
     * @property {string} parameters.user      Login user.
     * @property {string} parameters.pass      Login password.
     * @property {string} parameters.version   API version.
     */
    this.parameters = extend(true, {}, this._getDefaultParameters(), parameters);

    /**
     * Retrieves the REST-API URL of the shop and sets it as property.
     *
     * @property {string} apiUrl  URL to the integrated REST-API of the shop.
     *
     * @throws NoArgumentError      On missing parameters.
     * @throws InvalidArgumentError On invalid arguments provided.
     */
    this.apiUrl = this._getApiUrl({
      url: this.parameters.url,
      version: this.parameters.version,
    });

    /**
     * API credentials object for passing it as constructor parameter to sub APIs.
     *
     * @property {Object} apiCredentials       Constructor parameter object.
     * @property {Object} apiCredentials.url   URL to REST-API.
     * @property {Object} apiCredentials.user  Login user.
     * @property {Object} apiCredentials.pass  Login password.
     */
    const apiCredentials = {
      url: this.apiUrl,
      user: this.parameters.user,
      pass: this.parameters.pass,
    };

    // Set sub APIs.
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
   *
   * @private
   */
  _getDefaultParameters() {
    /**
     * Default parameters.
     *
     * @property {Object} defaultParameters         Default parameters object.
     * @property {string} defaultParameters.version API version.
     */
    const defaultParameters = {
      version: 'v2',
    };

    // Return parameters.
    return defaultParameters;
  }

  /**
   * Returns the URL to the integrated REST-API.
   *
   * @param {object} parameters         Object of parameters.
   * @param {string} parameters.url     URL to Gambio shop.
   * @param {string} parameters.version API version.
   *
   * @throws NoArgumentError      On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   *
   * @return {string} URL of the REST-API.
   *
   * @private
   */
  _getApiUrl(parameters) {
    /**
     * Validate object parameter.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkObject(parameters);

    /**
     * Validate URL.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkUrl(parameters.url);

    /**
     * Validate version.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
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
   * @throws NoArgumentError      On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   *
   * @private
   */
  _validate(parameters) {
    /**
     * Validate object parameter.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkObject(parameters);

    /**
     * Validate URL.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkUrl(parameters.url);

    /**
     * Validate user.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkUser(parameters.user);

    /**
     * Validate password.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkPassword(parameters.pass);

    /**
     * Check API version, if provided.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    if (parameters.version) Validator.checkVersion(parameters.version);
  }
}

module.exports = GambioApi;
