/**
 * @name Customer API
 * @description Provides an API for customers.
 * @example
 * 	API.customers.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Api = require('./Api');
var Requester = require('./../Requester');
var Validator = require('./../Validator');

/**
 * Class representing a customer API.
 * @extends Api
 */

var CustomerApi = function (_Api) {
  _inherits(CustomerApi, _Api);

  function CustomerApi() {
    _classCallCheck(this, CustomerApi);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerApi).apply(this, arguments));
  }

  _createClass(CustomerApi, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     *
     * @return {String}
     * @override
     * @private
     */
    value: function _getSuffix() {
      return '/customers';
    }

    /**
     * Returns all customers.
     * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
     *
     * @param {Object}    [sorting] Sorting criteria.
     * @param {String[]}  [limits]  Response fields limits.
     *
     * @example
     * 	CustomerApi.get({ lastname: 'asc' }, ['id', 'firstname']);
     *
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get(sorting, limits) {
      // Check manipulator arguments and change URL if required.
      var url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Searches in customers.
     *
     * @param  {String} term Search term.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'search',
    value: function search(term) {
      // Check argument.
      Validator.checkString(term, 'Customers search term');

      // Compose URL.
      var url = this._getEndpointUrl() + ('?q=' + term);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns all guest customers.
     * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
     *
     * @param {Object}    [sorting] Sorting criteria.
     * @param {String[]}  [limits]  Response fields limits.
     *
     * @return {Promise}
     */

  }, {
    key: 'getGuests',
    value: function getGuests(sorting, limits) {
      // URL parameters to be appended to URL.
      var suffixParameters = ['type=guest'];

      // Check manipulator arguments and change URL if required.
      var url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits, suffixParameters);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns addresses by provided customer ID.
     *
     * @param {Number} id Customer ID.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'getAddressesByCustomerId',
    value: function getAddressesByCustomerId(id) {
      // Check argument.
      Validator.checkInteger(id, 'Customer ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id + '/addresses');

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns customer by provided customer ID.
     *
     * @param {Number} id Customer ID.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'getById',
    value: function getById(id) {
      // Check argument.
      Validator.checkInteger(id, 'Customer ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Creates a new customer.
     *
     * @param {Object} data Customer data.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'create',
    value: function create(data) {
      // Check argument.
      Validator.checkObject(data, 'Customer data');

      // Return request promise.
      return Requester.post(this._getEndpointUrl(), this._getAuth(), data);
    }

    /**
     * Deletes customer by provided customer ID.
     *
     * @param {Number} id Customer ID.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'deleteById',
    value: function deleteById(id) {
      // Check argument.
      Validator.checkInteger(id, 'Customer ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.delete(url, this._getAuth());
    }

    /**
     * Updates a customer based on the customer data and customer ID provided.
     *
     * @param {Number} id    Customer ID.
     * @param {Object} data  Customer data.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      // Check ID argument.
      Validator.checkInteger(id, 'Customer ID');

      // Check data argument.
      Validator.checkObject(data, 'Customer data');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.put(url, this._getAuth(), data);
    }
  }]);

  return CustomerApi;
}(Api);

module.exports = CustomerApi;