import _ from 'lodash';
import CountryProvider from './provider/CountryProvider';
import ZoneProvider from './provider/ZoneProvider';
import AddressProvider from './provider/AddressProvider';
import CustomerProvider from './provider/CustomerProvider';
import EmailProvider from './provider/EmailProvider';
import CategoryProvider from './provider/CategoryProvider';
import OrderProvider from './provider/OrderProvider';
import checkUrl from './helper/checkUrl';

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
   * Creates a new instance of the API client.
   * @param {Object} parameters           Parameters object.
   * @param {String} parameters.url       URL to Gambio shop root (e.g.: 'http://shop.de/shop1').
   * @param {String} parameters.user      Login user (e.g.: 'admin@shop.de').
   * @param {String} parameters.pass      Login password (e.g.: '12345').
   */
  constructor(parameters) {
    // Validate parameters.
    this._validateParameters(parameters);

    // Compose REST-API URL.
    const url = `${parameters.url}/api.php/v2`;

    // Authentication object which is required for each provider.
    const auth = {
      user: parameters.user,
      pass: parameters.pass,
    };

    // Set providers.
    this.countries = new CountryProvider(url, auth);
    this.zones = new ZoneProvider(url, auth);
    this.addresses = new AddressProvider(url, auth);
    this.customers = new CustomerProvider(url, auth);
    this.emails = new EmailProvider(url, auth);
    this.categories = new CategoryProvider(url, auth);
    this.orders = new OrderProvider(url, auth);
  }

  /**
   * Validates the provided parameters in constructor.
   * @see #constructor for parameters.
   * @throws {Error} On missing or invalid parameters.
   * @private
   */
  _validateParameters(parameters) {
    // Check object.
    if (_.isNil(parameters) || !_.isObject(parameters)) {
      throw new Error('Missing or invalid parameter object');
    }

    // Check URL.
    checkUrl(parameters.url);

    // Check user.
    if (_.isNil(parameters.user) || !_.isString(parameters.user)) {
      throw new Error('Missing or invalid user');
    }

    // Check password.
    if (_.isNil(parameters.pass) || !_.isString(parameters.pass)) {
      throw new Error('Missing or invalid password');
    }
  }
}

export default GambioApi;
