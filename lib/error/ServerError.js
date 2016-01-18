/**
 * ServerError.
 * Error class for server responses with 5xx HTTP status code.
 *
 * @example
 * 	const ServerError = require('./ServerError');
 * 	throw new ServerError('This is an error');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class ServerError extends ExtendableError {
  /**
   * Creates a new ServerError.
   *
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = ServerError;
