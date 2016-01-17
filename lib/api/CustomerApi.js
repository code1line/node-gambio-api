/**
 * CustomerApi.
 * Provides a low-level API for customers.
 *
 * @example
 *  const credentials = {
 *  	url: 'http://www.myshop.com/api',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 *
 * 	const api = new CustomerApi(credentials);
 *
 * 	api.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

// Node modules dependencies.
const check = require('check-types');

// Library dependencies.
const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

// Class definition.
class CustomerApi extends Api {

  /**
   * Gets all customers.
   * Optionally, it is possible to pass in sorting criteria.
   *
   * @param  {object} [sorting] Sorting criteria. (Fieldname as key and 'asc' or 'desc' as value).
   *
   * @example
   * 	CustomerApi.get({
   * 		lastname: 'asc'
   * 	});
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  get(sorting) {
    // URL.
    let url = this.url;

    // Check sorting criteria object and append sorting criteria parameters to URL.
    if (check.assigned(sorting)) {
      // Check object.
      Validator.checkObject(sorting, messages.SORTING_OBJECT);

      // Append parameters to URL.
      url += `?${this._convertSortingObjectToUrlParameters(sorting)}`;
    }

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
   * Searches for customers.
   *
   * @param  {string} term Search term.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  search(term) {
    // Check search term argument.
    Validator.checkString(term, messages.SEARCH_TERM);

    // Compose URL.
    const url = `${this.url}/q=${term}`;

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
   * Gets all guest customers.
   * @return {Promise}
   */
  getGuests() {
    // Composed URL.
    const url = `${this.url}?type=guest`;

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
   * Get addresses by provided customer ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getAddressesByCustomerId(id) {
    // Check customer ID.
    Validator.checkId(id, messages.CUSTOMER_ID);

    // Compose URL.
    const url = this.url + `/${id}/addresses`;

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
   * Get customer by provided ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check customer ID.
    Validator.checkId(id, messages.CUSTOMER_ID);

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
   * Creates a new customer.
   *
   * @param  {object} data Customer data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  create(data) {
    // Check data object.
    Validator.checkObject(data, messages.CUSTOMER_DATA);

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
   * Delete customer by provided ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    // Check customer ID.
    Validator.checkId(id, messages.CUSTOMER_ID);

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
   * Updates a customer entry based on the data and ID provided.
   *
   * @param  {integer}  id    Customer ID.
   * @param  {object}   data  Customer data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    // Check customer ID.
    Validator.checkId(id, messages.CUSTOMER_ID);

    // Check data object.
    Validator.checkObject(data, messages.CUSTOMER_DATA);

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
    const suffix = '/customers';

    // Return suffix.
    return suffix;
  }
}

// Export class.
module.exports = CustomerApi;
