'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Provider2 = require('./Provider');

var _Provider3 = _interopRequireDefault(_Provider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a product provider.
 * @description Provides an API for products.
 * @extends Provider
 */

var ProductProvider = function (_Provider) {
  _inherits(ProductProvider, _Provider);

  function ProductProvider() {
    _classCallCheck(this, ProductProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProductProvider).apply(this, arguments));
  }

  _createClass(ProductProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
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

  }, {
    key: 'changeCategoryLink',
    value: function changeCategoryLink(id, oldCategoryId, newCategoryId) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('Product ID is missing or invalid');
      }

      // Check old category ID.
      if (_lodash2.default.isNil(oldCategoryId) || !_lodash2.default.isInteger(oldCategoryId)) {
        throw new Error('Old category ID is missing or invalid');
      }

      // Check new category ID.
      if (_lodash2.default.isNil(newCategoryId) || !_lodash2.default.isInteger(newCategoryId)) {
        throw new Error('New category ID is missing or invalid');
      }

      var data = { oldCategoryId: oldCategoryId, newCategoryId: newCategoryId };

      return this.dispatcher.put(this._getEndpointUrl() + '/' + id + '/links', data);
    }

    /**
     * Creates a new product.
     * @param {Object} data Product data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
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

  }, {
    key: 'deleteImage',
    value: function deleteImage(file) {
      // Check file.
      if (_lodash2.default.isNil(file) || !_lodash2.default.isString(file)) {
        throw new Error('Image filename is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

      return this.dispatcher.delete(url, { filename: file });
    }

    /**
     * Removes a product.
     * @param {Number} id Product ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.delete(this._getEndpointUrl() + '/' + id);
    }

    /**
     * Returns all associated 'Product -> Category' links for a specific product.
     * @param  {Number} id Product ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'getCategoryLinks',
    value: function getCategoryLinks(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id + '/links');
    }

    /**
     * Returns all products.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get() {
      return this.dispatcher.get(this._getEndpointUrl());
    }

    /**
     * Returns a specific product by provided product ID.
     * @param {Number} id Product ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id);
    }

    /**
     * Searches in products.
     * @param {String} term Search term.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'search',
    value: function search(term) {
      // Check search term.
      if (_lodash2.default.isNil(term) || !_lodash2.default.isString(term)) {
        throw new Error('Search term is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '?q=' + term);
    }

    /**
     * Renames an existing products image filename.
     * @param {String} oldName   Old filename
     * @param {String} newName   New filename
     * @return {Promise}
     */

  }, {
    key: 'renameImage',
    value: function renameImage(oldName, newName) {
      // Check old image filename.
      if (_lodash2.default.isNil(oldName) || !_lodash2.default.isString(oldName)) {
        throw new Error('Old image filename is missing or invalid');
      }

      // Check new image filename.
      if (_lodash2.default.isNil(newName) || !_lodash2.default.isString(newName)) {
        throw new Error('New image filename is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

      var data = {
        oldFilename: oldName,
        newFilename: newName
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

  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Product data object is missing or invalid');
      }

      return this.dispatcher.put(this._getEndpointUrl() + '/' + id, data);
    }

    /**
     * Uploads a new product image.
     * @param  {String} path Path to file.
     * @param  {String} name Filename.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'uploadImage',
    value: function uploadImage(path, name) {
      // Check path.
      if (_lodash2.default.isNil(path) || !_lodash2.default.isString(path)) {
        throw new Error('File path is missing or invalid');
      }

      // Check name.
      if (_lodash2.default.isNil(name) || !_lodash2.default.isString(name)) {
        throw new Error('File name is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/product_images');

      return this.dispatcher.uploadFile(url, path, name);
    }
  }]);

  return ProductProvider;
}(_Provider3.default);

exports.default = ProductProvider;