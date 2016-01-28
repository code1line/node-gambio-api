/**
 * @name E-Mail API
 * @description Provides an API for E-Mails.
 * @example
 * 	API.emails.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const check = require('check-types');
const errors = require('common-errors');

const Api = require('./Api');
const Requester = require('./../Requester');
const Validator = require('./../Validator');

/**
 * Class representing an E-Mail API.
 * @extends Api
 */
class EmailApi extends Api {
  /**
   * Returns the API endpoint URL suffix.
   *
   * @return {String}
   * @override
   * @private
   */
  _getSuffix() {
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
  get(sorting, limits) {
    // Check manipulator arguments and change URL if required.
    const url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits);

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
  getPending(sorting, limits) {
    // Check manipulator arguments and change URL if required.
    let url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits);

    // URL parameter to be appended to URL.
    const suffixParameter = 'state=pending';

    // Append search suffix parameter with question mark or ampersand.
    url += (check.contains('?') ? '&' : '?') + suffixParameter;

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
  getSent(sorting, limits) {
    // Check manipulator arguments and change URL if required.
    let url = this._modifyUrlByManipulatorArguments(this._getEndpointUrl(), sorting, limits);

    // URL parameter to be appended to URL.
    const suffixParameter = 'state=sent';

    // Append search suffix parameter with question mark or ampersand.
    url += (check.contains('?') ? '&' : '?') + suffixParameter;

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
  search(term) {
    // Check argument.
    Validator.checkString(term, 'E-Mails search term');

    // Compose URL.
    const url = this._getEndpointUrl() + `?q=${term}`;

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
  getById(id) {
    // Check argument.
    Validator.checkInteger(id, 'E-Mail ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

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
  deleteById(id) {
    // Check argument.
    Validator.checkInteger(id, 'E-Mail ID');

    // Compose URL.
    const url = this._getEndpointUrl() + `/${id}`;

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
  queue(data) {
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
  send(id, data) {
    // Use URL with ID?.
    let isUsingIdUrl;

    // Check arguments.
    if (check.assigned(id)) {
      // Check ID argument.
      Validator.checkInteger(id, 'E-Mail ID');
      isUsingIdUrl = true;
    } else if (check.assigned(data)) {
      // Check data argument.
      Validator.checkObject(data, 'E-Mail data');
      isUsingIdUrl = false;
    } else if (check.not.assigned(id) && check.not.assigned(data)) {
      // Throw error due to missing arguments.
      throw new errors.ArgumentNullError('E-Mail ID and data');
    }

    // Compose URL.
    const url = this._getEndpointUrl() + (isUsingIdUrl ? `/${id}` : '');

    // Return request promise.
    return Requester.delete(url, this._getAuth(), (isUsingIdUrl ? null : data));
  }
}

module.exports = EmailApi;
