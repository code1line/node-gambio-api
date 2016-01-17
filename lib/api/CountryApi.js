/**
 * CountryApi.
 * Provides a low-level API for countries.
 *
 * @example
 *  const credentials = {
 *  	url: 'http://www.myshop.com/api',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 *
 * 	const api = new CountryApi(credentials);
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
class CountryApi extends Api {

  /**
   * Get country by provided ID.
   *
   * @param  {integer} id Country ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check country ID.
    Validator.checkId(id, messages.COUNTRY_ID);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create request instance.
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Get zones of a country by provided country ID.
   *
   * @param  {integer} id Country ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getZonesByCountryId(id) {
    // Check country ID.
    Validator.checkId(id, messages.COUNTRY_ID);

    // Compose URL.
    const url = this.url + `/${id}/zones`;

    // Create request instance.
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
