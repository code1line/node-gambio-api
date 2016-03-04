import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing a product provider.
 * @description Provides an API for products.
 * @extends Provider
 */
class ProductProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/products';
  }

  /**
   * Changes an existing 'Product -> Category' link.
   * @param  {Number} id            Product ID.
   * @param  {Number} oldCategoryId Old category ID.
   * @param  {Number} newCategoryId New category ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  changeCategoryLink(id, oldCategoryId, newCategoryId) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('Product ID is missing or invalid');
    }

    // Check old category ID.
    if (_.isNil(oldCategoryId) || !_.isInteger(oldCategoryId)) {
      throw new Error('Old category ID is missing or invalid');
    }

    // Check new category ID.
    if (_.isNil(newCategoryId) || !_.isInteger(newCategoryId)) {
      throw new Error('New category ID is missing or invalid');
    }

    const data = { oldCategoryId, newCategoryId };

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}/links`, data);
  }

  /**
   * Creates a new product.
   * @param {Object} data Product data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  create(data) {
    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Product data object is missing or invalid');
    }

    return this.dispatcher.post(this._getEndpointUrl(), data);
  }

  /**
   * Removes a product image.
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
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

    return this.dispatcher.delete(url, { filename: file });
  }

  /**
   * Removes a product.
   * @param {Number} id Product ID.
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
   * Returns all associated 'Product -> Category' links for a specific product.
   * @param  {Number} id Product ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getCategoryLinks(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}/links`);
  }

  /**
   * Returns all products.
   * @return {Promise}
   */
  get() {
    return this.dispatcher.get(this._getEndpointUrl());
  }

  /**
   * Returns a specific product by provided product ID.
   * @param {Number} id Product ID.
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
   * Searches in products.
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
   * Renames an existing products image filename.
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
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

    const data = {
      oldFilename: oldName,
      newFilename: newName,
    };

    return this.dispatcher.put(url, data);
  }

  /**
   * Updates a product based on the product data and product ID provided.
   * @param {Number} id    Product ID.
   * @param {Object} data  Product data.
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
      throw new Error('Product data object is missing or invalid');
    }

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}`, data);
  }

  /**
   * Uploads a new product image.
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
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

    return this.dispatcher.uploadFile(url, path, name);
  }
}

export default ProductProvider;
