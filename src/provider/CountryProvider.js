import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a country provider.
 * @description Provides an API for countries.
 * @extends Provider
 */
class CountryApi extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/countries';
  }

  /**
   * Returns country by provided country ID.
   * @param {Number} id Country ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getById(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid.');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Returns zones of a country by provided country ID.
   * @param {Number} id Country ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getZonesByCountryId(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid.');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}/zones`);
  }
}

export default CountryApi;
