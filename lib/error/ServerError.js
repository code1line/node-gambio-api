/**
 * @name Server error
 *
 * @description Error class for server responses with 5xx HTTP status code.
 *
 * @example
 * 	const ServerError = require('./ServerError');
 * 	throw new ServerError('This is an error');
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing server error.
 * @extends ExtendableError
 */
class ServerError extends ExtendableError {
  /**
   * Creates a new ServerError.
   * @param {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

module.exports = ServerError;
