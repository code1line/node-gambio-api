/**
 * AddressApi.
 * Provides an API for adresses.
 *
 * @example
 *  const credentials = {
 *  	url: 'http://www.myshop.com/api',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 *
 * 	const api = new AddressApi(credentials);
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
class AddressApi extends Api {

  /**
   * Returns address by provided ID.
   *
   * @param  {integer} id Address ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check address ID.
    Validator.checkId(id, messages.ADDRESS_ID);

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
   * Creates a new address entry.
   *
   * @param  {object} data Address data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  create(data) {
    // Check data object.
    Validator.checkObject(data, messages.ADDRESS_DATA);

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    // Check address ID.
    Validator.checkId(id, messages.ADDRESS_ID);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    // Check address ID.
    Validator.checkId(id, messages.ADDRESS_ID);

    // Check data object.
    Validator.checkObject(data, messages.ADDRESS_DATA);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create request instance.
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

// Export class.
module.exports = AddressApi;
