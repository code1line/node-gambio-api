/**
 * @name Request error
 *
 * @description Error class for errors while requesting data.
 *
 * @example
 * 	const RequestError = require('./RequestError');
 * 	throw new RequestError('Could not resolve IP', { a: 1 });
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing a request error.
 * @extends ExtendableError
 */
class RequestError extends ExtendableError {
  /**
   * Creates a new RequestError.
   *
   * @param {string} message  Error message.
   * @param {object} data     Error data.
   */
  constructor(message, data) {
    // Set message.
    super(message);

    // Set data.
    this.data = data;
  }
}

module.exports = RequestError;
