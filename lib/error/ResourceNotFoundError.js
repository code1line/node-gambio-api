/**
 * ResourceNotFoundError.
 * Error class for not found resources.
 *
 * @example
 * 	const ResourceNotFoundError = require('./ResourceNotFoundError');
 * 	throw new ResourceNotFoundError('Could not find resource');
 */

'use strict';

// Dependencies.
const ExtendableError = require('./ExtendableError');

// Class definition.
class ResourceNotFoundError extends ExtendableError {
  /**
   * Creates a new ResourceNotFoundError.
   * @param  {string} message Error message.
   */
  constructor(message) {
    super(message);
  }
}

// Export class.
module.exports = ResourceNotFoundError;
