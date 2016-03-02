/**
 * @name E-Mail API
 * @description Provides an API for E-Mails.
 * @example
 * 	API.emails.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var check = require('check-types');
var errors = require('common-errors');

var Api = require('./Api');
var Requester = require('./../Requester');
var Validator = require('./../Validator');

/**
 * Class representing an E-Mail API.
 * @extends Api
 */

var EmailApi = function (_Api) {
  _inherits(EmailApi, _Api);

  function EmailApi() {
    _classCallCheck(this, EmailApi);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EmailApi).apply(this, arguments));
  }

  _createClass(EmailApi, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     *
     * @return {String}
     * @override
     * @private
     */
    value: function _getSuffix() {
      return '/emails';
    }

    /**
     * Returns all E-Mails.
     * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
     *
     * @param {Object}    [sorting] Sorting criteria.
     * @param {String[]}  [limits]  Response fields limits.
     *
     * @example
     * 	CustomerApi.get({ subject: 'desc' }, ['id', 'subject']);
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
     * Returns all pending E-Mails.
     * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
     *
     * @param {Object}    [sorting] Sorting criteria.
     * @param {String[]}  [limits]  Response fields limits.
     *
     * @return {Promise}
     */

  }, {
    key: 'getPending',
    value: function getPending(sorting, limits) {
      // URL parameters to be appended to URL.
      var suffixParameters = ['state=pending'];

      // Check manipulator arguments and change URL if required.
      var url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits, suffixParameters);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns all sent E-Mails.
     * Optionally, it is possible to pass in sorting and fieldname limitation criteria.
     *
     * @param {Object}    [sorting] Sorting criteria.
     * @param {String[]}  [limits]  Response fields limits.
     *
     * @return {Promise}
     */

  }, {
    key: 'getSent',
    value: function getSent(sorting, limits) {
      // URL parameters to be appended to URL.
      var suffixParameters = ['state=sent'];

      // Check manipulator arguments and change URL if required.
      var url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits, suffixParameters);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Searches in E-Mails.
     *
     * @param {String} term Search term.
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
      Validator.checkString(term, 'E-Mails search term');

      // Compose URL.
      var url = this._getEndpointUrl() + ('?q=' + term);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Returns E-Mail by provided E-Mail ID.
     *
     * @param {Number} id E-Mail ID.
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
      Validator.checkInteger(id, 'E-Mail ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.get(url, this._getAuth());
    }

    /**
     * Deletes E-mail by provided E-Mail ID.
     *
     * @param {Number} id E-Mail ID.
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
      Validator.checkInteger(id, 'E-Mail ID');

      // Compose URL.
      var url = this._getEndpointUrl() + ('/' + id);

      // Return request promise.
      return Requester.delete(url, this._getAuth());
    }

    /**
     * Queues a new E-Mail, so that it can be sent later over `send()`.
     *
     * @param {Object} data E-Mail data.
     *
     * @throws ArgumentNullError  If argument is missing.
     * @throws ArgumentError      If argument is invalid.
     *
     * @return {Promise}
     */

  }, {
    key: 'queue',
    value: function queue(data) {
      // Check argument.
      Validator.checkObject(data, 'E-Mail data');

      // Return request promise.
      return Requester.put(this._getEndpointUrl(), this._getAuth(), data);
    }

    /**
     * Sends a new or existing E-Mail.
     *
     * Providing `id` only will send an existing one.
     *
     * Skipping `id` with null or undefined
     * while passing in 'data' will create and send a new E-Mail.
     *
     * At least one parameter has to be provided.
     *
     * @param {Number} [id]   E-Mail ID (for sending existing E-Mail).
     * @param {Object} [data] E-Mail data (for creating a new E-Mail).
     *
     * @throws ArgumentNullError  If arguments are missing.
     * @throws ArgumentError      If any argument is invalid.
     *
     * @example
     * 	// Send exising E-Mail.
     * 	EmailApi
     * 		.send(15)
     * 		.then(console.log)
     * 		.catch(console.error);
     *
     * 	// Send new E-Mail.
     * 	const data = {};
     *
     * 	EmailApi
     * 		.send(null, data)
     * 		.then(console.log)
     * 		.catch(console.error);
     *
     * @return {Promise}
     */

  }, {
    key: 'send',
    value: function send(id, data) {
      // Use URL with ID?.
      var isUsingIdUrl = undefined;

      // Check arguments.
      if (check.assigned(id)) {
        // Check ID argument.
        Validator.checkInteger(id, 'E-Mail ID');
        isUsingIdUrl = true;
      } else if (check.assigned(data)) {
        // Check data argument.
        Validator.checkObject(data, 'E-Mail data');
        isUsingIdUrl = false;
      } else {
        // Throw error due to missing arguments.
        throw new errors.ArgumentNullError('E-Mail ID and data');
      }

      // Compose URL.
      var url = this._getEndpointUrl() + (isUsingIdUrl ? '/' + id : '');

      // Return request promise.
      return Requester.post(url, this._getAuth(), isUsingIdUrl ? null : data);
    }
  }]);

  return EmailApi;
}(Api);

module.exports = EmailApi;