/**
 * ExtendableError.
 * Advanced error object extended from native Error object.
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
 */

'use strict';

// Class definition.
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

    // Get error stack trace.
    Error.captureStackTrace(this, this.constructor.name);
  }
}

// Export class.
module.exports = ExtendableError;
