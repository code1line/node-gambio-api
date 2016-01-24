/**
 * @name Zone API.
 *
 * @description Provides an API for zones.
 *
 * @example
 * 	API.zones.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

/**
 * Class representing a zone API.
 * @extends Api
 */
class ZoneApi extends Api {

  /**
   * Returns zone by provided ID.
   *
   * @param  {integer} id Zone ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    /**
     * Check zone ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.ZONE_ID);

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

    // Return Requester promise.
    return request.get();
  }

  /**
   * Returns endpoint URL suffix.
   *
   * @return {string} URL suffix.
   *
   * @override
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/zones';

    // Return suffix.
    return suffix;
  }
}

module.exports = ZoneApi;
