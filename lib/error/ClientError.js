/**
 * @name Client Error
 *
 * @description Error class for server responses with 4xx HTTP status code.
 *
 * @example
 * 	const ClientError = require('./ClientError');
 * 	throw new ClientError('This is an error');
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing a client error.
 * @extends ExtendableError
 */
class ClientError extends ExtendableError {
  /**
   * Creates a new ClientError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

module.exports = ClientError;
