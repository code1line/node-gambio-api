/**
 * @name Server error
 *
 * @description Error class for error server responses.
 *
 * @example
 * 	const ServerError = require('./ServerError');
 * 	throw new ServerError('Could not find website', 404, { a: 1 });
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing a server error.
 * @extends ExtendableError
 */
class ServerError extends ExtendableError {
  /**
   * Creates a new ServerError.
   *
   * @param {string}  message  Error message.
   * @param {integer} code     Server status code.
   * @param {object}  data     Server response data.
   */
  constructor(message, code, data) {
    // Set message.
    super(message);

    // Set status code.
    this.code = code;

    // Set response data.
    this.data = data;
  }
}

module.exports = ServerError;
