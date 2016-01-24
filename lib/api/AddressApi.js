/**
 * @name Address API
 *
 * @description Provides an API for adresses.
 *
 * @example
 * 	API.addresses.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

/**
 * Class representing a Address API.
 * @extends Api
 */
class AddressApi extends Api {

  /**
   * Returns address by provided ID.
   *
   * @param {integer} id Address ID.
   *
   * @throws InvalidArgumentError On invalid type of `id` argument.
   * @throws NoArgumentError      On missing `id` argument.
   *
   * @return {Promise}
   */
  getById(id) {
    /**
     * Check address ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.ADDRESS_ID);

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
   * Creates a new address entry.
   *
   * @param  {object} data Address data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  create(data) {
    /**
     * Check address data object parameter.
     *
     * @throws InvalidArgumentError On invalid type of `data` argument.
     * @throws NoArgumentError      On missing `data` argument.
     */
    Validator.checkObject(data, messages.ADDRESS_DATA);

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url: this.url,
    });

    // Return request promise.
    return request.post(data);
  }

  /**
   * Deletes address by provided ID.
   *
   * @param  {integer} id Address ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    /**
     * Check address ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.ADDRESS_ID);

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
    return request.delete();
  }

  /**
   * Updates an address entry based on the data and ID provided.
   *
   * @param  {integer}  id    Address ID.
   * @param  {object}   data  Address data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    /**
     * Check address ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.ADDRESS_ID);

    /**
     * Check address data object parameter.
     *
     * @throws InvalidArgumentError On invalid type of `data` argument.
     * @throws NoArgumentError      On missing `data` argument.
     */
    Validator.checkObject(data, messages.ADDRESS_DATA);

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
    return request.put(data);
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
    const suffix = '/addresses';

    // Return suffix.
    return suffix;
  }
}

module.exports = AddressApi;
