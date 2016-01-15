/**
 * InvalidArgumentError.
 * Error class for argument type errors.
 *
 * @example
 * 	const InvalidArgumentError = require('./InvalidArgumentError');
 * 	throw new InvalidArgumentError('Expected string');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class InvalidArgumentError extends ExtendableError {
  /**
   * Creates a new InvalidArgumentError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = InvalidArgumentError;
