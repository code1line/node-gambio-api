/**
 * ZoneApi.
 * Provides an API for zones.
 *
 * @example
 * 	const credentials = {
 *  	url: 'http://www.myshop.com/api',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 *
 * 	const api = new ZoneApi(credentials);
 *
 * 	api.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

// Library dependencies.
const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

// Class definition.
class ZoneApi extends Api {

  /**
   * Returns zone by provided ID.
   *
   * @param  {integer} id Zone ID.
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   * @return {Promise}
   */
  getById(id) {
    // Check zone ID.
    Validator.checkId(id, messages.ZONE_ID);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create instance of Requester API.
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

// Export class.
module.exports = ZoneApi;
