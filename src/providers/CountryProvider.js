/**
 * @name Country API
 * @description Provides an API for countries.
 * @example
 * 	API.countries.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const Validator = require('./../Validator');

/**
 * Class representing a country API.
 * @extends Api
 */
class CountryApi extends Api {
  /**
   * Returns the API endpoint URL suffix.
   *
   * @return {String}
   * @override
   * @private
   */
  _getSuffix() {
    return '/countries';
  }

  /**
   * Returns country by provided country ID.
   *
   * @param {Number} id Country ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Country ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Returns zones of a country by provided country ID.
   *
   * @param {Number} id Country ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getZonesByCountryId(id) {
    // Check argument.
    Validator.checkInteger(id, 'Country ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}/zones`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }
}

// Export class.
module.exports = CountryApi;
