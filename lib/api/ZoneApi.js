/**
 * ZoneApi.
 * Provides a low-level API for countries.
 *
 * @example
 * 	const api = new ZoneApi('http://myshop.com/api', 'user', 'password');
 *
 * 	api.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

// Dependencies.
const check = require('check-types');
const Api = require('./Api');
const Requester = require('./../Requester');
const NoArgumentError = require('./../error/NoArgumentError');
const InvalidArgumentError = require('./../error/InvalidArgumentError');
const messages = require('./../messageContainer');

// Class definition.
class ZoneApi extends Api {

  /**
   * Get zone by provided ID.
   *
   * @param  {integer} id Zone ID.
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   * @return {Promise}
   */
  getById(id) {
    // Check zone ID.
    if (check.not.assigned(id)) {
      throw new NoArgumentError(messages.ZONE_ID_MISSING);
    } else if (check.not.integer(id)) {
      throw new InvalidArgumentError(messages.ZONE_ID_IS_NOT_AN_INTEGER);
    }

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create instance of Requester API.
    const request = new Requester(url, this.user, this.password);

    // Return Requester promise.
    return request.get();
  }

  /**
   * Returns endpoint URL suffix.
   * @return {string} URL suffix.
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/zones';

    // Return suffix.
    return suffix;
  }
}

// Export class.
module.exports = ZoneApi;
