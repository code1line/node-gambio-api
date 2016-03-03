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
   * Creates a new category.
   * @param {Object} data Category data.
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

  /**
   * Removes a category icon file.
   * @param {String} file Filename.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  deleteIcon(file) {
    // Check file.
    if (_.isNil(file) || !_.isString(file)) {
      throw new Error('Icon filename is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

    return this.dispatcher.delete(url, { filename: file });
  }

  /**
   * Removes a category image file.
   * @param {String} file Filename.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  deleteImage(file) {
    // Check file.
    if (_.isNil(file) || !_.isString(file)) {
      throw new Error('Image filename is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

    return this.dispatcher.delete(url, { filename: file });
  }

  /**
   * Removes a category.
   * @param {Number} id Category ID.
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
   * Returns all categories.
   * @return {Promise}
   */
  get() {
    return this.dispatcher.get(this._getEndpointUrl());
  }

  /**
   * Returns category by provided category ID.
   * @param {Number} id Category ID.
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
   * Searches in categories.
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
   * Renames an existing category icon filename.
   * @param {String} oldName   Old filename
   * @param {String} newName   New filename
   * @return {Promise}
   */
  renameIcon(oldName, newName) {
    // Check old icon filename.
    if (_.isNil(oldName) || !_.isString(oldName)) {
      throw new Error('Old icon filename is missing or invalid');
    }

    // Check new icon filename.
    if (_.isNil(newName) || !_.isString(newName)) {
      throw new Error('New icon filename is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

    const data = {
      oldFilename: oldName,
      newFilename: newName,
    };

    return this.dispatcher.put(url, data);
  }

  /**
   * Renames an existing category image filename.
   * @param {String} oldName   Old filename
   * @param {String} newName   New filename
   * @return {Promise}
   */
  renameImage(oldName, newName) {
    // Check old image filename.
    if (_.isNil(oldName) || !_.isString(oldName)) {
      throw new Error('Old image filename is missing or invalid');
    }

    // Check new image filename.
    if (_.isNil(newName) || !_.isString(newName)) {
      throw new Error('New image filename is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

    const data = {
      oldFilename: oldName,
      newFilename: newName,
    };

    return this.dispatcher.put(url, data);
  }


  /**
   * Updates a category based on the category data and category ID provided.
   * @param {Number} id    Category ID.
   * @param {Object} data  Category data.
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
      throw new Error('Category data object is missing or invalid');
    }

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}`, data);
  }

  /**
   * Uploads a new category icon.
   * @param  {String} path Path to file.
   * @param  {String} name Filename.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  uploadIcon(path, name) {
    // Check path.
    if (_.isNil(path) || !_.isString(path)) {
      throw new Error('File path is missing or invalid');
    }

    // Check name.
    if (_.isNil(name) || !_.isString(name)) {
      throw new Error('File name is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

    return this.dispatcher.uploadFile(url, path, name);
  }

  /**
   * Uploads a new category image.
   * @param  {String} path Path to file.
   * @param  {String} name Filename.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  uploadImage(path, name) {
    // Check path.
    if (_.isNil(path) || !_.isString(path)) {
      throw new Error('File path is missing or invalid');
    }

    // Check name.
    if (_.isNil(name) || !_.isString(name)) {
      throw new Error('File name is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

    return this.dispatcher.uploadFile(url, path, name);
  }
}

export default CategoryProvider;
