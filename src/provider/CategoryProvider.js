import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a category provider.
 * @description Provides an API for categories.
 * @extends Provider
 */
class CategoryProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/categories';
  }

  /**
   * Create a new category.
   * @param  {Object} data Category data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  create(data) {
    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Category data object is missing or invalid');
    }

    return this.dispatcher.post(this._getEndpointUrl(), data);
  }

}

export default CategoryProvider;
