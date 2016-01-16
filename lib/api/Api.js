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
   * @param  {string} url       URL to REST-API.
   * @param  {string} user      Login user.
   * @param  {string} password  Login password.
   *
   * @example
   * 	const api = new Api(
   * 		'http://shop.de/api.php/v2/myApi',
   * 		'admin@shop.de',
   * 		'12345'
   * 	);
   *
   */
  constructor(url, user, password) {
    // Validate constructor parameters.
    this._validate(arguments);

    // Set composed URL (main REST-API + endpoint suffix) as property.
    this.url = url + this._getSuffix();
    this.user = user;
    this.password = password;
  }

  /**
   * Validates credentials.
   *
   * @param {array} params Constructor parameters.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(params) {
    // Shortcuts.
    const url = params[0];
    const user = params[1];
    const password = params[2];

    // Check URL.
    if (check.not.assigned(url)) {
      throw new NoArgumentError(messages.URL_MISSING);
    } else if (check.not.string(url)) {
      throw new InvalidArgumentError(messages.URL_NOT_A_STRING);
    } else if (check.not.match(url, urlFormatRegex)) {
      throw new InvalidArgumentError(messages.URL_INVALID);
    }

    // Check user.
    if (check.not.assigned(user)) {
      throw new NoArgumentError(messages.USER_MISSING);
    } else if (check.not.string(user)) {
      throw new InvalidArgumentError(messages.USER_NOT_A_STRING);
    }

    // Check password.
    if (check.not.assigned(password)) {
      throw new NoArgumentError(messages.PASSWORD_MISSING);
    } else if (check.not.string(password)) {
      throw new InvalidArgumentError(messages.PASSWORD_NOT_A_STRING);
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
