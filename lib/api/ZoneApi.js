/**
 * @name Zone API.
 * @description Provides an API for zones.
 * @example
 * 	API.zones.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const Validator = require('./../Validator');

/**
 * Class representing a zone API.
 * @extends Api
 */
class ZoneApi extends Api {
  /**
   * Returns the API endpoint URL suffix.
   *
   * @return {String}
   * @override
   * @private
   */
  _getSuffix() {
    return '/zones';
  }

  /**
   * Returns zone by provided zone ID.
   *
   * @param {Number} id Zone ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Zone ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }
}

module.exports = ZoneApi;
