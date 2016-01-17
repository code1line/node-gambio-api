/**
 * ClientError.
 * Error class for server responses with 4xx HTTP status code.
 *
 * @example
 * 	const ClientError = require('./ClientError');
 * 	throw new ClientError('This is an error');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class ClientError extends ExtendableError {
  /**
   * Creates a new ClientError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = ClientError;
