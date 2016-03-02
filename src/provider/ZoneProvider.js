import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a zone provider.
 * @description Provides an API for zones.
 * @extends Provider
 */
class ZoneProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/zones';
  }

  /**
   * Returns zone by provided zone ID.
   * @param {Number} id Zone ID.
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
}

export default ZoneProvider;
