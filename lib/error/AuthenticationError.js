/**
 * AuthenticationError.
 * Error class for authentication errors.
 *
 * @example
 * 	const AuthenticationError = require('./AuthenticationError');
 * 	throw new AuthenticationError('Wrong server credentials');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class AuthenticationError extends ExtendableError {
  /**
   * Creates a new AuthenticationError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = AuthenticationError;
