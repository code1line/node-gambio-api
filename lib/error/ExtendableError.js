/**
 * @name Extendable error
 *
 * @description Advanced error object that inherits from native Error object.
 * Extending from this class allows you to
 * define error classes with custom names.
 *
 * @example
 * 	const ExtendableError = require('./ExtendableError');
 *
 * 	class MyError extends ExtendableError {
 * 		constructor(message) {
 * 			super(message);
 * 		}
 * 	}
 *
 * 	throw new MyError('Oops! An error!');
 */

'use strict';

/**
 * Class representing an extendable error.
 * @extends Error
 */
class ExtendableError extends Error {
  /**
   * Creates a new error instance.
   * @param  {string} message Error message.
   */
  constructor(message) {
    // Call native error constructor.
    super(message);

    // Assign error name.
    this.name = this.constructor.name;

    // Assign error message.
    this.message = message;

    // Set name to error stack trace.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

module.exports = ExtendableError;
