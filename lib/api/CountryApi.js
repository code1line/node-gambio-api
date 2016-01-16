'use strict';

const check = require('check-types');
const Api = require('./Api');
const Requester = require('./../Requester');
const NoArgumentError = require('./../error/NoArgumentError');
const InvalidArgumentError = require('./../error/InvalidArgumentError');
const messages = require('./../messageContainer');

class CountryApi extends Api {

  /**
   * Get country by provided ID.
   *
   * @param  {integer} id Country ID.
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   * @return {Promise}
   */
  getById(id) {
    // Check country ID.
    if (check.not.assigned(id)) {
      throw new NoArgumentError(messages.COUNTRY_ID_MISSING);
    } else if (check.not.integer(id)) {
      throw new InvalidArgumentError(messages.COUNTRY_ID_IS_NOT_AN_INTEGER);
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
    const suffix = '/countries';

    // Return suffix.
    return suffix;
  }
}

module.exports = CountryApi;
