/**
 * EmailApi.
 * Provides a low-level API for emails.
 *
 * @example
 *  const credentials = {
 *  	url: 'http://www.myshop.com/api',
 *  	user: 'username',
 *  	pass: 'password',
 *  };
 *
 * 	const api = new EmailApi(credentials);
 *
 * 	api.getById(36)
 * 		.then(console.log)
 * 		.catch(console.error);
 */

'use strict';

// Node module dependencies.
const check = require('check-types');
const Stream = require('stream');
const fs = require('fs');

// Library dependencies.
const Api = require('./Api');
const Requester = require('./../Requester');
const messages = require('./../messageContainer');
const Validator = require('./../Validator');
const NoArgumentError = require('./../error/NoArgumentError');
const InvalidArgumentError = require('./../error/InvalidArgumentError');

// Class definition.
class EmailApi extends Api {

  /**
   * Gets all E-Mails.
   * Optionally, it is possible to pass in sorting criteria.
   *
   * @param  {object} [sorting] Sorting criteria. (Fieldname as key and 'asc' or 'desc' as value).
   *
   * @example
   * 	EmailApi.get({
   * 		subject: 'asc'
   * 	});
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  get(sorting) {
    // URL.
    let url = this.url;

    // Check sorting criteria object and append sorting criteria parameters to URL.
    if (check.assigned(sorting)) {
      // Check object.
      Validator.checkObject(sorting, messages.SORTING_OBJECT);

      // Append parameters to URL.
      url += `?${this._convertSortingObjectToUrlParameters(sorting)}`;
    }

    // Create request instance.
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Gets all pending E-Mails.
   * @return {Promise}
   */
  getPending() {
    // Composed URL.
    const url = `${this.url}?state=pending`;

    // Create request instance.
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Gets all sent E-Mails.
   * @return {Promise}
   */
  getSent() {
    // Composed URL.
    const url = `${this.url}?state=sent`;

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  search(term) {
    // Check search term argument.
    Validator.checkString(term, messages.SEARCH_TERM);

    // Compose URL.
    const url = `${this.url}?q=${term}`;

    // Create request instance.
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Return request promise.
    return request.get();
  }

  /**
   * Get E-Mail by provided ID.
   *
   * @param  {integer} id E-Mail ID.
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  getById(id) {
    // Check E-Mail ID.
    Validator.checkId(id, messages.EMAIL_ID);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  deleteById(id) {
    // Check E-Mail ID.
    Validator.checkId(id, messages.EMAIL_ID);

    // Compose URL.
    const url = this.url + `/${id}`;

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  queue(data) {
    // Check data object.
    Validator.checkObject(data, messages.EMAIL_DATA);

    // Create request instance.
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
   * At least one parameter has to be set.
   *
   * @param  {integer} [id]   E-Mail ID (for sending existing E-Mail).
   * @param  {object}  [data] E-Mail data (for creating a new E-Mail).
   *
   * @throws InvalidArgumentError On invalid type of argument.
   * @throws NoArgumentError If no arguments has been passed.
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
      // Check E-Mail ID.
      Validator.checkId(id, messages.EMAIL_ID);
      isUsingIdUrl = true;
    } else if (check.assigned(data)) {
      // Check data object.
      Validator.checkObject(data, messages.EMAIL_DATA);
      isUsingIdUrl = false;
    } else if (check.not.assigned(id) && check.not.assigned(data)) {
      // Throw error due to missing arguments.
      throw new NoArgumentError(`E-Mail send method arguments ${messages.IS_MISSING}`);
    }

    // Set URL depensing on passed arguments.
    const url = isUsingIdUrl ? `${this.url}/${id}` : this.url;

    // Create request instance.
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
   * @throws NoArgumentError On missing argument.
   *
   * @return {Promise}
   */
  uploadAttachment(file) {
    // Is provided file a stream?.
    let isStream;

    // File to attach to form.
    // If argument is a string filepath,
    // this method opens the file from
    // given filepath and writes the Stream to this variable.
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

    // Replace '/emails' with '/attachment' API endpoint route.
    const url = this.url.replace(this._getSuffix(), '/attachments');

    // Create request instance.
    const request = new Requester({
      user: this.auth.user,
      pass: this.auth.pass,
      url,
    });

    // Create form data.
    const form = { file: fileToAttach };

    // Return request promise.
    return request.submitForm('POST', form);
  }

  /**
   * Returns endpoint URL suffix.
   *
   * @return {string} URL suffix.
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

// Export class.
module.exports = EmailApi;
