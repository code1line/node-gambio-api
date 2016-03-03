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
 * Class representing an email provider.
 * @description Provides an API for E-Mails.
 * @extends Provider
 */

var EmailProvider = function (_Provider) {
  _inherits(EmailProvider, _Provider);

  function EmailProvider() {
    _classCallCheck(this, EmailProvider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EmailProvider).apply(this, arguments));
  }

  _createClass(EmailProvider, [{
    key: '_getSuffix',

    /**
     * Returns the API endpoint URL suffix.
     * @return {String}
     * @private
     */
    value: function _getSuffix() {
      return '/emails';
    }

    /**
     * Returns all E-Mails.
     * @return {Promise}
     */

  }, {
    key: 'get',
    value: function get() {
      return this.dispatcher.get(this._getEndpointUrl());
    }

    /**
     * Returns all pending E-Mails.
     * @return {Promise}
     */

  }, {
    key: 'getPending',
    value: function getPending() {
      return this.dispatcher.get(this._getEndpointUrl() + '?state=pending');
    }

    /**
     * Returns all sent E-Mails.
     * @return {Promise}
     */

  }, {
    key: 'getSent',
    value: function getSent() {
      return this.dispatcher.get(this._getEndpointUrl() + '?state=sent');
    }

    /**
     * Searches in E-Mails.
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
     * Returns E-Mail by provided E-Mail ID.
     * @param {Number} id E-Mail ID.
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
     * Deletes E-mail by provided E-Mail ID.
     * @param {Number} id E-Mail ID.
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
     * Queues a new E-Mail, so that it can be sent later over `send()`.
     * @param {Object} data E-Mail data.
     * @throws {Error} On missing or invalid argument.
     * @return {Promise}
     */

  }, {
    key: 'queue',
    value: function queue(data) {
      // Check data.
      if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
        throw new Error('Email data object is missing or invalid');
      }

      return this.dispatcher.put(this._getEndpointUrl(), data);
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
     * @throws {Error} On missing or invalid argument.
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

      if (id) {
        // Check ID.
        if (_lodash2.default.isNil(id) || !_lodash2.default.isInteger(id)) {
          throw new Error('ID is missing or invalid');
        }

        isUsingIdUrl = true;
      } else if (data) {
        // Check data.
        if (_lodash2.default.isNil(data) || !_lodash2.default.isObject(data)) {
          throw new Error('E-Mail data object is missing or invalid');
        }
        isUsingIdUrl = false;
      } else {
        // Throw error due to missing arguments.
        throw new Error('E-Mail ID and data are missing');
      }

      var url = this._getEndpointUrl() + (isUsingIdUrl ? '/' + id : '');
      var dataObject = isUsingIdUrl ? null : data;

      return this.dispatcher.post(url, dataObject);
    }

    /**
     * Uploads an attachment for emails.
     * @param {String} file File path.
     * @return {Promise}
     */

  }, {
    key: 'uploadAttachment',
    value: function uploadAttachment(path) {
      // Check path.
      if (_lodash2.default.isNil(path) || !_lodash2.default.isString(path)) {
        throw new Error('File path is missing or invalid');
      }

      // Replace endpoint URL.
      var url = this._getEndpointUrl().replace(this._getSuffix(), '/attachments');

      return this.dispatcher.uploadFile(url, path, _lodash2.default.uniqueId(), ['filedata', 'name']);
    }
  }]);

  return EmailProvider;
}(_Provider3.default);

exports.default = EmailProvider;