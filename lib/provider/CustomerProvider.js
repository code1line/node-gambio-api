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
 * Class representing a customer provider.
 * @description Provides an API for customers.
 * @extends Provider
 */

var CustomerProvider = function (_Provider) {
  _inherits(CustomerProvider, _Provider);

  function CustomerProvider() {
    _classCallCheck(this, CustomerProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerProvider).apply(this, arguments));
  }

  _createClass(CustomerProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/customers';
    }

    /**
     * Returns all customers.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get() {
      return this.dispatcher.get(this._getEndpointUrl());
    }

    /**
     * Searches in customers.
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
     * Returns all guest customers.
     * @return {Promise}
     */

  }, {
    key: 'getGuests',
    value: function getGuests() {
      return this.dispatcher.get(this._getEndpointUrl() + '?type=guest');
    }

    /**
     * Returns addresses by provided customer ID.
     * @param {Number} id Customer ID.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'getAddressesByCustomerId',
    value: function getAddressesByCustomerId(id) {
      // Check ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id + '/addresses');
    }

    /**
     * Returns customer by provided customer ID.
     * @param {Number} id Customer ID.
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
     * Creates a new customer.
     * @param {Object} data Customer data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
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
     * Updates a customer based on the customer data and customer ID provided.
     * @param {Number} id    Customer ID.
     * @param {Object} data  Customer data.
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
        throw new Error('Customer data object is missing or invalid');
      }

      return this.dispatcher.put(this._getEndpointUrl() + '/' + id, data);
    }
  }]);

  return CustomerProvider;
}(_Provider3.default);

exports.default = CustomerProvider;