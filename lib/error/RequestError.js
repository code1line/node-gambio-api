/**
 * RequestError.
 * Error class for errors while requesting data.
 *
 * @example
 * 	const RequestError = require('./RequestError');
 * 	throw new RequestError('Expected ID');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class RequestError extends ExtendableError {
  /**
   * Creates a new RequestError.
   *
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = RequestError;
