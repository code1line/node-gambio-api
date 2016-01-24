/**
 * @name E-Mail API
 *
 * @description Provides an API for E-Mails.
 *
 * @example
 * 	API.emails.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

const check = require('check-types');
const Stream = require('stream');
const fs = require('fs');

const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');
const NoArgumentError = require('./../error/NoArgumentError');
const InvalidArgumentError = require('./../error/InvalidArgumentError');

/**
 * Class representing an E-Mail API.
 * @extends Api
 */
class EmailApi extends Api {

  /**
   * Returns all E-Mails.
   *
   * Optionally, it is possible to pass in sorting criteria.
   *
   * @param {object} [sorting] Sorting criteria (fieldname as key and 'asc'/'desc' as value).
   *
   * @example
   * 	EmailApi.get({
   * 		subject: 'asc'
   * 	});
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  get(sorting) {
    // URL.
    let url = this.url;

    // Check sorting criteria object and append sorting criteria parameters to URL.
    if (check.assigned(sorting)) {
      /**
       * Check sorting object parameter.
       *
       * @throws InvalidArgumentError On invalid type of `sorting` argument.
       * @throws NoArgumentError      On missing `sorting` argument.
       */
      Validator.checkObject(sorting, messages.SORTING_OBJECT);

      // Append parameters to URL.
      url += `?${this._convertSortingObjectToUrlParameters(sorting)}`;
    }

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Returns all pending E-Mails.
   *
   * @return {Promise}
   */
  getPending() {
    /**
     * Compose request URL.
     * @type {string}
     */
    const url = `${this.url}?state=pending`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Returns all sent E-Mails.
   *
   * @return {Promise}
   */
  getSent() {
    /**
     * Compose request URL.
     * @type {string}
     */
    const url = `${this.url}?state=sent`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Searches for E-Mails.
   *
   * @param  {string} term Search term.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  search(term) {
    /**
     * Check search term parameter.
     *
     * @throws InvalidArgumentError On invalid type of `term` argument.
     * @throws NoArgumentError      On missing `term` argument.
     */
    Validator.checkString(term, messages.SEARCH_TERM);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = `${this.url}?q=${term}`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Returns E-Mail by provided ID.
   *
   * @param  {integer} id E-Mail ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    /**
     * Check E-Mail ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.EMAIL_ID);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = this.url + `/${id}`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Deletes E-mail by provided ID.
   *
   * @param  {integer} id E-Mail ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    /**
     * Check E-Mail ID parameter.
     *
     * @throws InvalidArgumentError On invalid type of `id` argument.
     * @throws NoArgumentError      On missing `id` argument.
     */
    Validator.checkId(id, messages.EMAIL_ID);

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = this.url + `/${id}`;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.delete();
  }

  /**
   * Queues a new E-Mail, so that it can be sent later over `send()`.
   *
   * @param  {object} data E-Mail data.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  queue(data) {
    /**
     * Check customer data object parameter.
     *
     * @throws InvalidArgumentError On invalid type of `data` argument.
     * @throws NoArgumentError      On missing `data` argument.
     */
    Validator.checkObject(data, messages.EMAIL_DATA);

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url: this.url,
    });

    // Return request promise.
    return request.put(data);
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
   * @param  {integer} [id]   E-Mail ID (for sending existing E-Mail).
   * @param  {object}  [data] E-Mail data (for creating a new E-Mail).
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      If no arguments have been passed.
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
      /**
       * Check E-Mail ID parameter.
       *
       * @throws InvalidArgumentError On invalid type of `id` argument.
       * @throws NoArgumentError      On missing `id` argument.
       */
      Validator.checkId(id, messages.EMAIL_ID);
      isUsingIdUrl = true;
    } else if (check.assigned(data)) {
      /**
       * Check E-Mail data object parameter.
       *
       * @throws InvalidArgumentError On invalid type of `data` argument.
       * @throws NoArgumentError      On missing `data` argument.
       */
      Validator.checkObject(data, messages.EMAIL_DATA);
      isUsingIdUrl = false;
    } else if (check.not.assigned(id) && check.not.assigned(data)) {
      // Throw error due to missing arguments.
      throw new NoArgumentError(`E-Mail send method arguments ${messages.IS_MISSING}`);
    }

    /**
     * Compose request URL.
     * @type {string}
     */
    const url = isUsingIdUrl ? `${this.url}/${id}` : this.url;

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return isUsingIdUrl ? request.post() : request.post(data);
  }
  /**
   * Uploads a file for E-Mail attachment.
   *
   * FIXME Server keeps sending back 500 Error.
   * NOTE Skipping this method (+ test) until this problem is solved.
   *
   * @param  {Stream|string} file File to be uploaded (Stream or path to file).
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError      On missing argument.
   *
   * @return {Promise}
   */
  uploadAttachment(file) {
    /**
     * Is provided file a stream?
     * @type {boolean}
     */
    let isStream;

    /**
     * File to attach to form.
     * @type {Stream}
     */
    let fileToAttach;

    // Check argument.
    if (check.not.assigned(file)) {
      throw new NoArgumentError(`${messages.FILE} ${messages.IS_MISSING}`);
    } else if (check.instance(file, Stream)) {
      // Argument is a stream.
      isStream = true;
    } else if (check.string(file)) {
      // Argument is a filepath.
      isStream = false;
    } else {
      throw new InvalidArgumentError(`${messages.FILE} ${messages.IS_INVALID}`);
    }

    // Get file as stream, if argument is filepath and not a stream.
    if (!isStream) {
      try {
        // Resolve filepath and create new Stream by reading file as Stream.
        fileToAttach = fs.createReadStream(file);
      } catch (error) {
        throw new InvalidArgumentError(error.message);
      }
    } else {
      fileToAttach = file;
    }

    /**
     * Compose request URL.
     * Replace '/emails' with '/attachment' API endpoint route.
     * @type {string}
     */
    const url = this.url.replace(this._getSuffix(), '/attachments');

    /**
     * Creates a new Requester instance.
     * @type {Requester}
     */
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    /**
     * Form data.
     * @type {object}
     */
    const form = { file: fileToAttach };

    // Return request promise.
    return request.submitForm('POST', form);
  }

  /**
   * Returns endpoint URL suffix.
   *
   * @return {string} URL suffix.
   *
   * @override
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/emails';

    // Return suffix.
    return suffix;
  }
}

module.exports = EmailApi;
