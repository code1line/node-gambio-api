/**
 * @name No argument error.
 *
 * @description Error class for missing argument.
 *
 * @example
 * 	const NoArgumentError = require('./NoArgumentError');
 * 	throw new NoArgumentError('Expected a parameter');
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing No argument error.
 * @extends ExtendableError
 */
class NoArgumentError extends ExtendableError {
  /**
   * Creates a new NoArgumentError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

module.exports = NoArgumentError;
