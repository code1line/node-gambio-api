/**
 * @name Customer API
 *
 * @description Provides an API for customers.
 *
 * @example
 * 	API.customers.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const check = require('check-types');

const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');

/**
 * Class representing a customer API.
 * @extends Api
 */
class CustomerApi extends Api {

  /**
   * Returns all customers.
   *
   * Optionally, it is possible to pass in sorting criteria.
   *
   * @param {object} [sorting] Sorting criteria (fieldname as key and 'asc'/'desc' as value).
   *
   * @example
   * 	CustomerApi.get({
   * 		lastname: 'asc'
   * 	});
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  get(sorting) {
    // URL.
    let url = this.url;

    // Check sorting criteria object and append sorting criteria parameters to URL.
    if (check.assigned(sorting)) {
      /**
       * Check sorting parameter.
       *
       * @throws InvalidArgumentError On invalid type of `sorting` argument.
       * @throws NoArgumentError      On missing `sorting` argument.
       */
      Validator.checkObject(sorting, messages.SORTING_OBJECT);

      // Append parameters to URL.
      url += `?${this._convertSortingObjectToUrlParameters(sorting)}`;
    }

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
   * Searches for customers.
   *
   * @param  {string} term Search term.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  search(term) {
    /**
     * Check search term parameter.
     *
     * @throws InvalidArgumentError On invalid type of `term` argument.
     * @throws NoArgumentError      On missing `term` argument.
     */
    Validator.checkString(term, messages.SEARCH_TERM);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = `${this.url}?q=${term}`;

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
   * Returns all guest customers.
   *
   * @return {Promise}
   */
  getGuests() {
    /**
     * Compose request URL.
     * @type {string}
     */
    const url = `${this.url}?type=guest`;

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
   * Returns addresses by provided customer ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getAddressesByCustomerId(id) {
    /**
     * Check customer ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.CUSTOMER_ID);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = this.url + `/${id}/addresses`;

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
   * Returns customer by provided ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    /**
     * Check customer ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.CUSTOMER_ID);

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
   * Creates a new customer.
   *
   * @param  {object} data Customer data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  create(data) {
    /**
     * Check customer data parameter.
     *
     * @throws InvalidArgumentError On invalid type of `data` argument.
     * @throws NoArgumentError      On missing `data` argument.
     */
    Validator.checkObject(data, messages.CUSTOMER_DATA);

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
   * Deletes customer by provided ID.
   *
   * @param  {integer} id Customer ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    /**
     * Check customer ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.CUSTOMER_ID);

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
   * Updates a customer entry based on the data and ID provided.
   *
   * @param  {integer}  id    Customer ID.
   * @param  {object}   data  Customer data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    /**
     * Check customer ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.CUSTOMER_ID);

    /**
     * Check customer data parameter.
     *
     * @throws InvalidArgumentError On invalid type of `data` argument.
     * @throws NoArgumentError      On missing `data` argument.
     */
    Validator.checkObject(data, messages.CUSTOMER_DATA);

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
    const suffix = '/customers';

    // Return suffix.
    return suffix;
  }
}

module.exports = CustomerApi;
