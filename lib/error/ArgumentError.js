/**
 * @name Invalid argument error
 *
 * @description Error class for argument type errors.
 *
 * @example
 * 	const InvalidArgumentError = require('./InvalidArgumentError');
 * 	throw new InvalidArgumentError('Expected string');
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing an invalid error class.
 * @extends ExtendableError
 */
class InvalidArgumentError extends ExtendableError {
  /**
   * Creates a new InvalidArgumentError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

module.exports = InvalidArgumentError;
