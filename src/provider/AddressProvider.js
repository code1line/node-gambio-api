import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a address provider.
 * @description Provides an API for adresses.
 * @extends Provider
 */
class AddressProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/addresses';
  }

  /**
   * Returns address by provided address ID.
   * @param {Number} id Address ID.
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
   * Creates a new address entry.
   * @param {Object} data Address data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  create(data) {
    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Address data is missing or invalid');
    }

    return this.dispatcher.post(`${this._getEndpointUrl()}`, data);
  }

  /**
   * Deletes address by provided address ID.
   * @param {Number} id Address ID.
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
   * Updates an address entry based on the address data and address ID provided.
   * @param {Number} id   Address ID.
   * @param {Object} data Address data.
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
      throw new Error('Address data is missing or invalid');
    }

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}`);
  }
}

export default AddressProvider;
