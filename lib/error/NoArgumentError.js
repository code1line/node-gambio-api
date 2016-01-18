/**
 * NoArgumentError.
 * Error class for missing argument.
 *
 * @example
 * 	const NoArgumentError = require('./NoArgumentError');
 * 	throw new NoArgumentError('Expected a parameter');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class NoArgumentError extends ExtendableError {
  /**
   * Creates a new NoArgumentError.
   *
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = NoArgumentError;
