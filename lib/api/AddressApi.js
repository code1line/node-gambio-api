/**
 * @name Address API
 * @description Provides an API for adresses.
 * @example
 * 	API.addresses.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const Validator = require('./../Validator');

/**
 * Class representing a Address API.
 * @extends Api
 */
class AddressApi extends Api {

  /**
   * Returns the API endpoint URL suffix.
   *
   * @return {String}
   * @override
   * @private
   */
  _getSuffix() {
    return '/addresses';
  }

  /**
   * Returns address by provided address ID.
   *
   * @param {Number} id Address ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Address ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Creates a new address entry.
   *
   * @param {Object} data Address data.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  create(data) {
    // Check argument.
    Validator.checkObject(data, 'Address data');

    // Return request promise.
    return Requester.get(this._getEndpointUrl(), this._getAuth());
  }

  /**
   * Deletes address by provided address ID.
   *
   * @param {Number} id Address ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  deleteById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Address ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.delete(url, this._getAuth());
  }

  /**
   * Updates an address entry based on the address data and address ID provided.
   *
   * @param {Number} id   Address ID.
   * @param {Object} data Address data.
   *
   * @throws ArgumentNullError  If an argument is missing.
   * @throws ArgumentError      If an argument is invalid.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    // Check ID argument.
    Validator.checkInteger(id, 'Address ID');

    // Check address data argument.
    Validator.checkObject(data, 'Address data');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.put(url, this._getAuth());
  }
}

module.exports = AddressApi;
