import _ from 'lodash';
import Provider from './Provider';

/**
 * Class representing an email provider.
 * @description Provides an API for E-Mails.
 * @extends Provider
 */
class EmailProvider extends Provider {
  /**
   * Returns the API endpoint URL suffix.
   * @return {String}
   * @private
   */
  _getSuffix() {
    return '/emails';
  }

  /**
   * Returns all E-Mails.
   * @return {Promise}
   */
  get() {
    return this.dispatcher.get(this._getEndpointUrl());
  }

  /**
   * Returns all pending E-Mails.
   * @return {Promise}
   */
  getPending() {
    return this.dispatcher.get(`${this._getEndpointUrl()}?state=pending`);
  }

  /**
   * Returns all sent E-Mails.
   * @return {Promise}
   */
  getSent() {
    return this.dispatcher.get(`${this._getEndpointUrl()}?state=sent`);
  }

  /**
   * Searches in E-Mails.
   * @param {String} term Search term.
   * @throws {Error} On missing or invalid argument.
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
   * Returns E-Mail by provided E-Mail ID.
   * @param {Number} id E-Mail ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  getById(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.get(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Deletes E-mail by provided E-Mail ID.
   * @param {Number} id E-Mail ID.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  deleteById(id) {
    // Check ID.
    if (_.isNil(id) || !_.isInteger(id)) {
      throw new Error('ID is missing or invalid');
    }

    return this.dispatcher.delete(`${this._getEndpointUrl()}/${id}`);
  }

  /**
   * Queues a new E-Mail, so that it can be sent later over `send()`.
   * @param {Object} data E-Mail data.
   * @throws {Error} On missing or invalid argument.
   * @return {Promise}
   */
  queue(data) {
    // Check data.
    if (_.isNil(data) || !_.isObject(data)) {
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
  send(id, data) {
    // Use URL with ID?.
    let isUsingIdUrl;

    if (id) {
      // Check ID.
      if (_.isNil(id) || !_.isInteger(id)) {
        throw new Error('ID is missing or invalid');
      }

      isUsingIdUrl = true;
    } else if (data) {
      // Check data.
      if (_.isNil(data) || !_.isObject(data)) {
        throw new Error('E-Mail data object is missing or invalid');
      }
      isUsingIdUrl = false;
    } else {
      // Throw error due to missing arguments.
      throw new Error('E-Mail ID and data are missing');
    }

    const url = this._getEndpointUrl() + (isUsingIdUrl ? `/${id}` : '');
    const dataObject = (isUsingIdUrl ? null : data);

    return this.dispatcher.post(url, dataObject);
  }

  /**
   * Uploads an attachment for emails.
   * @param {String} file File path.
   * @return {Promise}
   * @TODO Wait until it works in internal REST controller.
   */
  uploadAttachment(path) {
    // Check path.
    if (_.isNil(path) || !_.isString(path)) {
      throw new Error('File path is missing or invalid');
    }

    // Replace endpoint URL.
    const url = this._getEndpointUrl().replace(this._getSuffix(), '/attachments');

    return this.dispatcher.uploadFile(url, path, _.uniqueId(), ['filedata', 'name']);
  }
}

export default EmailProvider;
