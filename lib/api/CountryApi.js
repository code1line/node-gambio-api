/**
 * @name Country API
 *
 * @description Provides an API for countries.
 *
 * @example
 * 	API.countries.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

/**
 * Class representing a country API.
 * @extends Api
 */
class CountryApi extends Api {

  /**
   * Returns country by provided ID.
   *
   * @param  {integer} id Country ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    /**
     * Validate country ID parameter.
     *
     * @throws NoArgumentError      On missing `id` argument.
     * @throws InvalidArgumentError On invalid `id` argument.
     */
    Validator.checkId(id, messages.COUNTRY_ID);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = this.url + `/${id}`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Returns zones of a country by provided country ID.
   *
   * @param  {integer} id Country ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getZonesByCountryId(id) {
    /**
     * Check country ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.COUNTRY_ID);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = this.url + `/${id}/zones`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Returns endpoint URL suffix.
   *
   * @return {string} URL suffix.
   * @override
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/countries';

    // Return suffix.
    return suffix;
  }
}

// Export class.
module.exports = CountryApi;
