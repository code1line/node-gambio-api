/**
 * @name Request error.
 *
 * @description Error class for errors while requesting data.
 *
 * @example
 * 	const RequestError = require('./RequestError');
 * 	throw new RequestError('Expected ID');
 */

'use strict';

const ExtendableError = require('./ExtendableError');

/**
 * Class representing a request error.
 * @extends ExtendableError
 */
class RequestError extends ExtendableError {
  /**
   * Creates a new RequestError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

module.exports = RequestError;
