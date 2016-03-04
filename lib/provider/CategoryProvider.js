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
 * Class representing a category provider.
 * @description Provides an API for categories.
 * @extends Provider
 */

var CategoryProvider = function (_Provider) {
  _inherits(CategoryProvider, _Provider);

  function CategoryProvider() {
    _classCallCheck(this, CategoryProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CategoryProvider).apply(this, arguments));
  }

  _createClass(CategoryProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/categories';
    }

    /**
     * Creates a new category.
     * @param {Object} data Category data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
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

  }, {
    key: 'deleteIcon',
    value: function deleteIcon(file) {
      // Check file.
      if (_lodash2.default.isNil(file) || !_lodash2.default.isString(file)) {
        throw new Error('Icon filename is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

      return this.dispatcher.delete(url, { filename: file });
    }

    /**
     * Removes a category image file.
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
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

      return this.dispatcher.delete(url, { filename: file });
    }

    /**
     * Removes a category.
     * @param {Number} id Category ID.
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
     * Returns all categories.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get() {
      return this.dispatcher.get(this._getEndpointUrl());
    }

    /**
     * Returns category by provided category ID.
     * @param {Number} id Category ID.
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
     * Searches in categories.
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
     * Renames an existing category icon filename.
     * @param {String} oldName   Old filename
     * @param {String} newName   New filename
     * @return {Promise}
     */

  }, {
    key: 'renameIcon',
    value: function renameIcon(oldName, newName) {
      // Check old icon filename.
      if (_lodash2.default.isNil(oldName) || !_lodash2.default.isString(oldName)) {
        throw new Error('Old icon filename is missing or invalid');
      }

      // Check new icon filename.
      if (_lodash2.default.isNil(newName) || !_lodash2.default.isString(newName)) {
        throw new Error('New icon filename is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

      var data = {
        oldFilename: oldName,
        newFilename: newName
      };

      return this.dispatcher.put(url, data);
    }

    /**
     * Renames an existing category image filename.
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
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

      var data = {
        oldFilename: oldName,
        newFilename: newName
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

  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Category data object is missing or invalid');
      }

      return this.dispatcher.put(this._getEndpointUrl() + '/' + id, data);
    }

    /**
     * Uploads a new category icon.
     * @param  {String} path Path to file.
     * @param  {String} name Filename.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'uploadIcon',
    value: function uploadIcon(path, name) {
      // Check path.
      if (_lodash2.default.isNil(path) || !_lodash2.default.isString(path)) {
        throw new Error('File path is missing or invalid');
      }

      // Check name.
      if (_lodash2.default.isNil(name) || !_lodash2.default.isString(name)) {
        throw new Error('File name is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_icons');

      return this.dispatcher.uploadFile(url, path, name);
    }

    /**
     * Uploads a new category image.
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
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/category_images');

      return this.dispatcher.uploadFile(url, path, name);
    }
  }]);

  return CategoryProvider;
}(_Provider3.default);

exports.default = CategoryProvider;