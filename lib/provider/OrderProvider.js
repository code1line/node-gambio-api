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
 * Class representing an order provider.
 * @description Provides an API for orders.
 * @extends Provider
 */

var OrderProvider = function (_Provider) {
  _inherits(OrderProvider, _Provider);

  function OrderProvider() {
    _classCallCheck(this, OrderProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OrderProvider).apply(this, arguments));
  }

  _createClass(OrderProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/orders';
    }

    /**
     * Creates an order item attribute.
     * @param  {Number} orderId Order ID.
     * @param  {Number} itemId  Order item ID.
     * @param  {Object} data    Order item attribute data.
     * @return {Promise}
     */

  }, {
    key: 'createItemAttribute',
    value: function createItemAttribute(orderId, itemId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check order item attribute data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order item attribute data is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes';

      return this.dispatcher.post(url, data);
    }

    /**
     * Creates an order item.
     * @param  {Number} orderId Order ID.
     * @param  {Object} data    Order item data.
     * @return {Promise}
     */

  }, {
    key: 'createItem',
    value: function createItem(orderId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order item data is missing or invalid');
      }

      return this.dispatcher.post(this._getEndpointUrl() + '/' + orderId + '/items', data);
    }

    /**
     * Creates an order total.
     * @param  {Number} orderId Order ID.
     * @param  {Object} data    Order total data.
     * @return {Promise}
     */

  }, {
    key: 'createTotal',
    value: function createTotal(orderId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order total data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order total data is missing or invalid');
      }

      return this.dispatcher.post(this._getEndpointUrl() + '/' + orderId + '/totals', data);
    }

    /**
     * Creates a new order.
     * @param {Object} data Order data.
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check order data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order data is missing or invalid');
      }

      return this.dispatcher.post(this._getEndpointUrl(), data);
    }

    /**
     * Deletes an order item attribute by its ID.
     * @param  {Number} orderId       Order ID.
     * @param  {Number} itemId        Order item ID.
     * @param  {Number} attributeId   Order item attribute ID.
     * @return {Promise}
     */

  }, {
    key: 'deleteItemAttributeById',
    value: function deleteItemAttributeById(orderId, itemId, attributeId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check order item attribute ID.
      if (_lodash2.default.isNil(attributeId) || !_lodash2.default.isInteger(attributeId)) {
        throw new Error('Order item attribute ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes/' + attributeId;

      return this.dispatcher.delete(url);
    }

    /**
     * Deletes an order item by its ID.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} itemId    Order item ID.
     * @return {Promise}
     */

  }, {
    key: 'deleteItemById',
    value: function deleteItemById(orderId, itemId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId;

      return this.dispatcher.delete(url);
    }

    /**
     * Deletes an order total by its ID.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} totalId   Order total ID.
     * @return {Promise}
     */

  }, {
    key: 'deleteTotalById',
    value: function deleteTotalById(orderId, totalId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order total ID.
      if (_lodash2.default.isNil(totalId) || !_lodash2.default.isInteger(totalId)) {
        throw new Error('Order total ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/totals/' + totalId;

      return this.dispatcher.delete(url);
    }

    /**
     * Delets an order by its ID.
     * @param  {Number} id Order ID.
     * @return {Promise}
     */

  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      // Check order ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('Order ID is missing or invalid');
      }

      return this.dispatcher.delete(this._getEndpointUrl() + '/' + id);
    }

    /**
     * Returns all status history records from a specific order.
     * @param {Number} orderId Order ID.
     * @return {Promise}
     */

  }, {
    key: 'getHistory',
    value: function getHistory(orderId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/history';

      return this.dispatcher.get(url);
    }

    /**
     * Returns a detailed order status history record of a specific order.
     * @param  {Number} orderId     Order ID.
     * @param  {Number} historyId   Order status history ID.
     * @return {Promise}
     */

  }, {
    key: 'getHistoryById',
    value: function getHistoryById(orderId, historyId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order status history ID.
      if (_lodash2.default.isNil(historyId) || !_lodash2.default.isInteger(historyId)) {
        throw new Error('Order status history ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/history/' + historyId;

      return this.dispatcher.get(url);
    }

    /**
     * Searches in order status history.
     * @param  {Number} orderId Order ID.
     * @param  {String} term    Search term.
     * @return {Promise}
     */

  }, {
    key: 'searchHistory',
    value: function searchHistory(orderId, term) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check search term.
      if (_lodash2.default.isNil(term) || !_lodash2.default.isString(term)) {
        throw new Error('Search term is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/history/?q=' + term;

      return this.dispatcher.get(url);
    }

    /**
     * Returns all item attributes from a specific order.
     * @param {Number} orderId  Order ID.
     * @param {Number} itemId   Order item ID.
     * @return {Promise}
     */

  }, {
    key: 'getItemAttributes',
    value: function getItemAttributes(orderId, itemId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes';

      return this.dispatcher.get(url);
    }

    /**
     * Returns an item attribute from a specific order.
     * @param  {Number} orderId       Order ID.
     * @param  {Number} itemId        Order item ID.
     * @param  {Number} attributeId   Order item attribute ID.
     * @return {Promise}
     */

  }, {
    key: 'getItemAttributeById',
    value: function getItemAttributeById(orderId, itemId, attributeId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check order item attribute ID.
      if (_lodash2.default.isNil(attributeId) || !_lodash2.default.isInteger(attributeId)) {
        throw new Error('Order item attribute ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes/' + attributeId;

      return this.dispatcher.get(url);
    }

    /**
     * Searches in order item attributes.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} itemId    Order item ID.
     * @param  {String} term      Search term.
     * @return {Promise}
     */

  }, {
    key: 'searchItemAttributes',
    value: function searchItemAttributes(orderId, itemId, term) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check search term.
      if (_lodash2.default.isNil(term) || !_lodash2.default.isString(term)) {
        throw new Error('Search term is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes/?q=' + term;

      return this.dispatcher.get(url);
    }

    /**
     * Returns all order items.
     * @param {Number} orderId Order ID.
     * @return {Promise}
     */

  }, {
    key: 'getItems',
    value: function getItems(orderId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items';

      return this.dispatcher.get(url);
    }

    /**
     * Returns an item from a specific order.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} itemId    Order item ID.
     * @return {Promise}
     */

  }, {
    key: 'getItemById',
    value: function getItemById(orderId, itemId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId;

      return this.dispatcher.get(url);
    }

    /**
     * Searches in order items.
     * @param  {Number} orderId Order ID.
     * @param  {String} term    Search term.
     * @return {Promise}
     */

  }, {
    key: 'searchItems',
    value: function searchItems(orderId, term) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check search term.
      if (_lodash2.default.isNil(term) || !_lodash2.default.isString(term)) {
        throw new Error('Search term is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/?q=' + term;

      return this.dispatcher.get(url);
    }

    /**
     * Returns all order totals.
     * @param {Number} orderId Order ID.
     * @return {Promise}
     */

  }, {
    key: 'getTotals',
    value: function getTotals(orderId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/totals';

      return this.dispatcher.get(url);
    }

    /**
     * Returns a total from a specific order.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} totalId    Order total ID.
     * @return {Promise}
     */

  }, {
    key: 'getTotalById',
    value: function getTotalById(orderId, totalId) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order total ID.
      if (_lodash2.default.isNil(totalId) || !_lodash2.default.isInteger(totalId)) {
        throw new Error('Order total ID is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/totals/' + totalId;

      return this.dispatcher.get(url);
    }

    /**
     * Searches in order totals.
     * @param  {Number} orderId Order ID.
     * @param  {String} term    Search term.
     * @return {Promise}
     */

  }, {
    key: 'searchTotals',
    value: function searchTotals(orderId, term) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check search term.
      if (_lodash2.default.isNil(term) || !_lodash2.default.isString(term)) {
        throw new Error('Search term is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/totals/?q=' + term;

      return this.dispatcher.get(url);
    }

    /**
     * Returns all orders.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get() {
      return this.dispatcher.get(this._getEndpointUrl());
    }

    /**
     * Returns a specific order by its ID.
     * @param {Number} id Order ID.
     * @return {Promise}
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      // Check order ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('Order ID is missing or invalid');
      }

      return this.dispatcher.get(this._getEndpointUrl() + '/' + id);
    }

    /**
     * Searches in orders.
     * @param  {String} term Search term.
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
     * Updates an order item attribute by its ID.
     * @param  {Number} orderId     Order ID.
     * @param  {Number} itemId      Item ID.
     * @param  {Number} attributeId Attribute ID.
     * @param  {Object} data        Order item attribute data.
     * @return {Promise}
     */

  }, {
    key: 'updateItemAttributeById',
    value: function updateItemAttributeById(orderId, itemId, attributeId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check order item attribute ID.
      if (_lodash2.default.isNil(attributeId) || !_lodash2.default.isInteger(attributeId)) {
        throw new Error('Order item attribute ID is missing or invalid');
      }

      // Check order item attribute data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order item attribute data is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId + '/attributes/' + attributeId;

      return this.dispatcher.put(url, data);
    }

    /**
     * Updates an order item.
     * @param  {Number} orderId Order ID.
     * @param  {Number} itemId  Order item ID.
     * @param  {Object} data    Order item data.
     * @return {Promise}
     */

  }, {
    key: 'updateItemById',
    value: function updateItemById(orderId, itemId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order item ID.
      if (_lodash2.default.isNil(itemId) || !_lodash2.default.isInteger(itemId)) {
        throw new Error('Order item ID is missing or invalid');
      }

      // Check order item data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order item data is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/items/' + itemId;

      return this.dispatcher.put(url, data);
    }

    /**
     * Updates status of a specific order.
     * @param  {Number} orderId   Order ID.
     * @param  {Object} data      Order status data.
     * @return {Promise}
     */

  }, {
    key: 'updateStatus',
    value: function updateStatus(orderId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order status data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order status data is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/status';

      return this.dispatcher.put(url, data, true);
    }

    /**
     * Updates an order total by its ID.
     * @param  {Number} orderId   Order ID.
     * @param  {Number} totalId   Order total ID.
     * @param  {Object} data      Order total data.
     * @return {Promise}
     */

  }, {
    key: 'updateTotalById',
    value: function updateTotalById(orderId, totalId, data) {
      // Check order ID.
      if (_lodash2.default.isNil(orderId) || !_lodash2.default.isInteger(orderId)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order total ID.
      if (_lodash2.default.isNil(totalId) || !_lodash2.default.isInteger(totalId)) {
        throw new Error('Order total ID is missing or invalid');
      }

      // Check order total data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order total data is missing or invalid');
      }

      var url = this._getEndpointUrl() + '/' + orderId + '/totals/' + totalId;

      return this.dispatcher.put(url, data);
    }

    /**
     * Updates a specific order by its ID.
     * @param  {Number} id   Order ID.
     * @param  {Object} data Order data.
     * @return {Promise}
     */

  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      // Check order ID.
      if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
        throw new Error('Order ID is missing or invalid');
      }

      // Check order data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Order data is missing or invalid');
      }

      return this.dispatcher.put(this._getEndpointUrl() + '/' + id, data);
    }
  }]);

  return OrderProvider;
}(_Provider3.default);

exports.default = OrderProvider;