/**
 * @name Address API
 * @description Provides an API for adresses.
 * @example
 * 	API.addresses.getById(36)
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
 * Class representing a Address API.
 * @extends Api
 */

var AddressApi = function (_Api) {
  _inherits(AddressApi, _Api);

  function AddressApi() {
    _classCallCheck(this, AddressApi);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AddressApi).apply(this, arguments));
  }

  _createClass(AddressApi, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     *
     * @return {String}
     * @override
     * @private
     */
    value: function _getSuffix() {
      return '/addresses';
    }

    /**
     * Returns address by provided address ID.
     *
     * @param {Number} id Address ID.
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
      Validator.checkInteger(id, 'Address ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Creates a new address entry.
     *
     * @param {Object} data Address data.
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
      Validator.checkObject(data, 'Address data');

      // Return request promise.
      return Requester.post(this._getEndpointUrl(), this._getAuth(), data);
    }

    /**
     * Deletes address by provided address ID.
     *
     * @param {Number} id Address ID.
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
      Validator.checkInteger(id, 'Address ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.delete(url, this._getAuth());
    }

    /**
     * Updates an address entry based on the address data and address ID provided.
     *
     * @param {Number} id   Address ID.
     * @param {Object} data Address data.
     *
     * @throws ArgumentNullError  If an argument is missing.
     * @throws ArgumentError      If an argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'updateById',
    value: function updateById(id, data) {
      // Check ID argument.
      Validator.checkInteger(id, 'Address ID');

      // Check address data argument.
      Validator.checkObject(data, 'Address data');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.put(url, this._getAuth(), data);
    }
  }]);

  return AddressApi;
}(Api);

module.exports = AddressApi;