import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing an order provider.
 * @description Provides an API for orders.
 * @extends Provider
 */
class OrderProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/orders';
  }

  /**
   * Creates an order item attribute.
   * @param  {Number} orderId Order ID.
   * @param  {Number} itemId  Order item ID.
   * @param  {Object} data    Order item attribute data.
   * @return {Promise}
   */
  createItemAttribute(orderId, itemId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check order item attribute data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order item attribute data is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes`;

    return this.dispatcher.post(url, data);
  }

  /**
   * Creates an order item.
   * @param  {Number} orderId Order ID.
   * @param  {Object} data    Order item data.
   * @return {Promise}
   */
  createItem(orderId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order item data is missing or invalid');
    }

    return this.dispatcher.post(`${this._getEndpointUrl()}/${orderId}/items`, data);
  }

  /**
   * Creates an order total.
   * @param  {Number} orderId Order ID.
   * @param  {Object} data    Order total data.
   * @return {Promise}
   */
  createTotal(orderId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order total data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order total data is missing or invalid');
    }

    return this.dispatcher.post(`${this._getEndpointUrl()}/${orderId}/totals`, data);
  }

  /**
   * Creates a new order.
   * @param {Object} data Order data.
   * @return {Promise}
   */
  create(data) {
    // Check order data.
    if (_.isNil(data) || !_.isObject(data)) {
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
  deleteItemAttributeById(orderId, itemId, attributeId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check order item attribute ID.
    if (_.isNil(attributeId) || !_.isInteger(attributeId)) {
      throw new Error('Order item attribute ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes/${attributeId}`;

    return this.dispatcher.delete(url);
  }

  /**
   * Deletes an order item by its ID.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} itemId    Order item ID.
   * @return {Promise}
   */
  deleteItemById(orderId, itemId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}`;

    return this.dispatcher.delete(url);
  }

  /**
   * Deletes an order total by its ID.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} totalId   Order total ID.
   * @return {Promise}
   */
  deleteTotalById(orderId, totalId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order total ID.
    if (_.isNil(totalId) || !_.isInteger(totalId)) {
      throw new Error('Order total ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/totals/${totalId}`;

    return this.dispatcher.delete(url);
  }

  /**
   * Delets an order by its ID.
   * @param  {Number} id Order ID.
   * @return {Promise}
   */
  deleteById(id) {
    // Check order ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('Order ID is missing or invalid');
    }

    return this.dispatcher.delete(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Returns all status history records from a specific order.
   * @param {Number} orderId Order ID.
   * @return {Promise}
   */
  getHistory(orderId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/history`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns a detailed order status history record of a specific order.
   * @param  {Number} orderId     Order ID.
   * @param  {Number} historyId   Order status history ID.
   * @return {Promise}
   */
  getHistoryById(orderId, historyId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order status history ID.
    if (_.isNil(historyId) || !_.isInteger(historyId)) {
      throw new Error('Order status history ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/history/${historyId}`;

    return this.dispatcher.get(url);
  }

  /**
   * Searches in order status history.
   * @param  {Number} orderId Order ID.
   * @param  {String} term    Search term.
   * @return {Promise}
   */
  searchHistory(orderId, term) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check search term.
    if (_.isNil(term) || !_.isString(term)) {
      throw new Error('Search term is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/history/?q=${term}`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns all item attributes from a specific order.
   * @param {Number} orderId  Order ID.
   * @param {Number} itemId   Order item ID.
   * @return {Promise}
   */
  getItemAttributes(orderId, itemId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns an item attribute from a specific order.
   * @param  {Number} orderId       Order ID.
   * @param  {Number} itemId        Order item ID.
   * @param  {Number} attributeId   Order item attribute ID.
   * @return {Promise}
   */
  getItemAttributeById(orderId, itemId, attributeId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check order item attribute ID.
    if (_.isNil(attributeId) || !_.isInteger(attributeId)) {
      throw new Error('Order item attribute ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes/${attributeId}`;

    return this.dispatcher.get(url);
  }

  /**
   * Searches in order item attributes.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} itemId    Order item ID.
   * @param  {String} term      Search term.
   * @return {Promise}
   */
  searchItemAttributes(orderId, itemId, term) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check search term.
    if (_.isNil(term) || !_.isString(term)) {
      throw new Error('Search term is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes/?q=${term}`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns all order items.
   * @param {Number} orderId Order ID.
   * @return {Promise}
   */
  getItems(orderId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns an item from a specific order.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} itemId    Order item ID.
   * @return {Promise}
   */
  getItemById(orderId, itemId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}`;

    return this.dispatcher.get(url);
  }

  /**
   * Searches in order items.
   * @param  {Number} orderId Order ID.
   * @param  {String} term    Search term.
   * @return {Promise}
   */
  searchItems(orderId, term) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check search term.
    if (_.isNil(term) || !_.isString(term)) {
      throw new Error('Search term is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/?q=${term}`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns all order totals.
   * @param {Number} orderId Order ID.
   * @return {Promise}
   */
  getTotals(orderId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/totals`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns a total from a specific order.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} totalId    Order total ID.
   * @return {Promise}
   */
  getTotalById(orderId, totalId) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order total ID.
    if (_.isNil(totalId) || !_.isInteger(totalId)) {
      throw new Error('Order total ID is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/totals/${totalId}`;

    return this.dispatcher.get(url);
  }

  /**
   * Searches in order totals.
   * @param  {Number} orderId Order ID.
   * @param  {String} term    Search term.
   * @return {Promise}
   */
  searchTotals(orderId, term) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check search term.
    if (_.isNil(term) || !_.isString(term)) {
      throw new Error('Search term is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/totals/?q=${term}`;

    return this.dispatcher.get(url);
  }

  /**
   * Returns all orders.
   * @return {Promise}
   */
  get() {
    return this.dispatcher.get(this._getEndpointUrl());
  }

  /**
   * Returns a specific order by its ID.
   * @param {Number} id Order ID.
   * @return {Promise}
   */
  getById(id) {
    // Check order ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('Order ID is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Searches in orders.
   * @param  {String} term Search term.
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
   * Updates an order item attribute by its ID.
   * @param  {Number} orderId     Order ID.
   * @param  {Number} itemId      Item ID.
   * @param  {Number} attributeId Attribute ID.
   * @param  {Object} data        Order item attribute data.
   * @return {Promise}
   */
  updateItemAttributeById(orderId, itemId, attributeId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check order item attribute ID.
    if (_.isNil(attributeId) || !_.isInteger(attributeId)) {
      throw new Error('Order item attribute ID is missing or invalid');
    }

    // Check order item attribute data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order item attribute data is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}/attributes/${attributeId}`;

    return this.dispatcher.put(url, data);
  }

  /**
   * Updates an order item.
   * @param  {Number} orderId Order ID.
   * @param  {Number} itemId  Order item ID.
   * @param  {Object} data    Order item data.
   * @return {Promise}
   */
  updateItemById(orderId, itemId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order item ID.
    if (_.isNil(itemId) || !_.isInteger(itemId)) {
      throw new Error('Order item ID is missing or invalid');
    }

    // Check order item data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order item data is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/items/${itemId}`;

    return this.dispatcher.put(url, data);
  }

  /**
   * Updates status of a specific order.
   * @param  {Number} orderId   Order ID.
   * @param  {Object} data      Order status data.
   * @return {Promise}
   */
  updateStatus(orderId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order status data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order status data is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/status`;

    return this.dispatcher.put(url, data, true);
  }

  /**
   * Updates an order total by its ID.
   * @param  {Number} orderId   Order ID.
   * @param  {Number} totalId   Order total ID.
   * @param  {Object} data      Order total data.
   * @return {Promise}
   */
  updateTotalById(orderId, totalId, data) {
    // Check order ID.
    if (_.isNil(orderId) || !_.isInteger(orderId)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order total ID.
    if (_.isNil(totalId) || !_.isInteger(totalId)) {
      throw new Error('Order total ID is missing or invalid');
    }

    // Check order total data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order total data is missing or invalid');
    }

    const url = `${this._getEndpointUrl()}/${orderId}/totals/${totalId}`;

    return this.dispatcher.put(url, data);
  }

  /**
   * Updates a specific order by its ID.
   * @param  {Number} id   Order ID.
   * @param  {Object} data Order data.
   * @return {Promise}
   */
  updateById(id, data) {
    // Check order ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('Order ID is missing or invalid');
    }

    // Check order data.
    if (_.isNil(data) || !_.isObject(data)) {
      throw new Error('Order data is missing or invalid');
    }

    return this.dispatcher.put(`${this._getEndpointUrl()}/${id}`, data);
  }
}

export default OrderProvider;
