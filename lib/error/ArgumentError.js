/**
 * @name Argument error
 *
 * @description Error class for argument type errors.
 *
 * @example
 * 	const ArgumentError = require('./ArgumentError');
 * 	throw new ArgumentError('Expected string', 2);
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing an argument error.
 * @extends ExtendableError
 */
class ArgumentError extends ExtendableError {
  /**
   * Creates a new ArgumentError.
   *
   * Note, that there are error codes:
   * - 1 Missing argument.
   * - 2 Wrong type of argument.
   * - 3 Invalid argument.
   *
   * @param  {string}   message   Error message.
   * @param  {integer}  code      Error code.
   */
  constructor(message, code) {
    // Set message.
    super(message);

    // Set code.
    this.code = code;
  }
}

module.exports = ArgumentError;
