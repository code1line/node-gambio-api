import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a customer provider.
 * @description Provides an API for customers.
 * @extends Provider
 */
class CustomerProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/customers';
  }

  /**
   * Returns all customers.
   * @return {Promise}
   */
  get() {
    return this.dispatcher.get(this._getEndpointUrl());
  }

  /**
   * Searches in customers.
   * @param {String} term Search term.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  search(term) {
    // Check search term.
    if (_.isNil(term) || !_.isString(term)) {
      throw new Error('Search term is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}?q=${term}`);
  }

  /**
   * Returns all guest customers.
   * @return {Promise}
   */
  getGuests() {
    return this.dispatcher.get(`${this._getEndpointUrl()}?type=guest`);
  }

  /**
   * Returns addresses by provided customer ID.
   * @param {Number} id Customer ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getAddressesByCustomerId(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}/addresses`);
  }

  /**
   * Returns customer by provided customer ID.
   * @param {Number} id Customer ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getById(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Creates a new customer.
   * @param {Object} data Customer data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  create(data) {
    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Customer data object is missing or invalid');
    }

    return this.dispatcher.post(this._getEndpointUrl(), data);
  }

  /**
   * Deletes customer by provided customer ID.
   * @param {Number} id Customer ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  deleteById(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.delete(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Updates a customer based on the customer data and customer ID provided.
   * @param {Number} id    Customer ID.
   * @param {Object} data  Customer data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  updateById(id, data) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Customer data object is missing or invalid');
    }

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}`, data);
  }
}

export default CustomerProvider;
