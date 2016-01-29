/**
 * @name Customer API
 * @description Provides an API for customers.
 * @example
 * 	API.customers.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const Api = require('./Api');
const Requester = require('./../Requester');
const Validator = require('./../Validator');

/**
 * Class representing a customer API.
 * @extends Api
 */
class CustomerApi extends Api {
  /**
   * Returns the API endpoint URL suffix.
   *
   * @return {String}
   * @override
   * @private
   */
  _getSuffix() {
    return '/customers';
  }

  /**
   * Returns all customers.
   * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
   *
   * @param {Object}    [sorting] Sorting criteria.
   * @param {String[]}  [limits]  Response fields limits.
   *
   * @example
   * 	CustomerApi.get({ lastname: 'asc' }, ['id', 'firstname']);
   *
   * @return {Promise}
   */
  get(sorting, limits) {
    // Check manipulator arguments and change URL if required.
    const url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits);

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Searches in customers.
   *
   * @param  {String} term Search term.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  search(term) {
    // Check argument.
    Validator.checkString(term, 'Customers search term');

    // Compose URL.
    const url = this._getEndpointUrl() + `?q=${term}`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Returns all guest customers.
   * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
   *
   * @param {Object}    [sorting] Sorting criteria.
   * @param {String[]}  [limits]  Response fields limits.
   *
   * @return {Promise}
   */
  getGuests(sorting, limits) {
    // URL parameters to be appended to URL.
    const suffixParameters = ['type=guest'];

    // Check manipulator arguments and change URL if required.
    const url = this._modifyUrlByManipulatorArguments(
      this._getEndpointUrl(),
      sorting,
      limits,
      suffixParameters
    );

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Returns addresses by provided customer ID.
   *
   * @param {Number} id Customer ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getAddressesByCustomerId(id) {
    // Check argument.
    Validator.checkInteger(id, 'Customer ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}/addresses`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Returns customer by provided customer ID.
   *
   * @param {Number} id Customer ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Customer ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.get(url, this._getAuth());
  }

  /**
   * Creates a new customer.
   *
   * @param {Object} data Customer data.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  create(data) {
    // Check argument.
    Validator.checkObject(data, 'Customer data');

    // Return request promise.
    return Requester.post(this._getEndpointUrl(), this._getAuth(), data);
  }

  /**
   * Deletes customer by provided customer ID.
   *
   * @param {Number} id Customer ID.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  deleteById(id) {
    // Check argument.
    Validator.checkInteger(id, 'Customer ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.delete(url, this._getAuth());
  }

  /**
   * Updates a customer based on the customer data and customer ID provided.
   *
   * @param {Number} id    Customer ID.
   * @param {Object} data  Customer data.
   *
   * @throws ArgumentNullError  If argument is missing.
   * @throws ArgumentError      If argument is invalid.
   *
   * @return {Promise}
   */
  updateById(id, data) {
    // Check ID argument.
    Validator.checkInteger(id, 'Customer ID');

    // Check data argument.
    Validator.checkObject(data, 'Customer data');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

    // Return request promise.
    return Requester.put(url, this._getAuth(), data);
  }
}

module.exports = CustomerApi;
