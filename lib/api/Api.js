/**
 * Api.
 * API base class, that is meant to be extended by other API classes.
 *
 * @example
 * 	class MyApi extends Api {
 * 		_getSuffix() {
 * 			return '/subroute/to/api';
 * 		}
 * 	}
 *
 * 	const instanceOfMyApi = new MyApi('http://mysite.com');
 */

'use strict';

// Dependencies.
const check = require('check-types');
const NoArgumentError = require('./../error/NoArgumentError');
const InvalidArgumentError = require('./../error/InvalidArgumentError');
const messages = require('./../messageContainer');
const urlFormatRegex = require('./../regexContainer').urlFormat;

// Class definition.
class Api {

  /**
   * Creates an API instance.
   * @param  {string} url URL to main REST-API.
   */
  constructor(url) {
    // Validate URL.
    this._validate(url);

    // Set composed URL (main REST-API + endpoint suffix) as property.
    this.url = url + this._getSuffix();
  }

  /**
   * Returns the API url.
   * @return {string} Composed API URL with endpoint suffix.
   */
  getApiUrl() {
    return this.url;
  }

  /**
   * Validates the URL constructor parameter.
   * @param  {string} url Endpoint URL.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(url) {
    // Check URL.
    if (check.not.assigned(url)) {
      throw new NoArgumentError(messages.URL_MISSING);
    } else if (check.not.string(url)) {
      throw new InvalidArgumentError(messages.URL_NOT_A_STRING);
    } else if (check.not.match(url, urlFormatRegex)) {
      throw new InvalidArgumentError(messages.URL_INVALID);
    }
  }

  /**
   * Returns endpoint URL suffix.
   * @return {string} URL suffix.
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/';

    // Return suffix.
    return suffix;
  }
}

// Export class.
module.exports = Api;
