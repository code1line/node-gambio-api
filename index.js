/**
 * node-gambio-api
 *
 * A low-level Node.js API client for Gambio.
 *
 * This module provides methods to retrieve data
 * from a Gambio shop over the REST-API.
 *
 * @example
 * 	const credentials = {
 * 		url: 'https://myshop.de',
 * 		user: 'admin@myshop.de',
 * 		pass: '12345',
 * 	};
 *
 * 	const API = new GambioApi(credentials);
 *
 * 	// Return URL of REST-API.
 * 	API.getApiUrl();
 *
 * @version 0.1.0
 * @author Ronald Loyko
 * @license MIT
 */

'use strict';

// Dependencies.
const check = require('check-types');
const extend = require('extend');
const NoArgumentError = require('./lib/error/NoArgumentError');
const InvalidArgumentError = require('./lib/error/InvalidArgumentError');
const messages = require('./lib/messageContainer');
const urlFormatRegex = require('./lib/regexContainer').urlFormat;

// Class definition.
class GambioApi {

  /**
   * Creates a Gambio API instance with the provided credentials.
   *
   * @param  {object} credentials = {} Server credentials.
   * @param  {string} credentials.url URL to Gambio shop.
   * @param  {string} credentials.user Login user.
   * @param  {string} credentials.pass Login password.
   * @param  {string} [credentials.version = 'v2'] API version.
   *
   * @example
   * 	const validUrl = 'http://my-shop.de';
   * 	const anotherValidUrl = 'https://mypage.de/shop';
   *
   * 	const validUser = 'admin@shop.de';
   * 	const validPass = '12345';
   *
   *  const credentials = {
   *  	url: validUrl,
   *  	user: validUser,
   *  	pass: validPass,
   *  };
   *
   *  const API = new GambioApi(credentials);
   */
  constructor(credentials) {
    // Validate credentials.
    this._validate(credentials);

    // Extend and set credentials as property.
    this.credentials = this._extend(credentials);

    // Set composed API url as property.
    this.apiUrl = this.credentials.url + this._getRelativeApiUrl(this.credentials.version);
  }

  /**
   * Returns the API url.
   * @return {string} URL of Gambio's REST-API.
   */
  getApiUrl() {
    return this.apiUrl;
  }

  /**
   * Extends default with provided ones and return extended credentials object.
   * @param  {object} credentials Credentials parameter.
   * @return {object}             Extended credentials object.
   * @private
   */
  _extend(credentials) {
    // Default credentials.
    const defaultCredentials = {
      version: 'v2',
    };

    // Return extended credentials object.
    return extend(true, {}, defaultCredentials, credentials);
  }

  /**
   * Validates the provided credentials.
   * @param {object} credentials Credentials parameter.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(credentials) {
    // Check credentials parameter.
    if (check.not.assigned(credentials)) {
      throw new NoArgumentError(messages.CREDENTIALS_MISSING);
    } else if (check.not.object(credentials)) {
      throw new InvalidArgumentError(messages.CREDENTIALS_NOT_AN_OBJECT);
    }

    // Check URL.
    if (check.not.assigned(credentials.url)) {
      throw new NoArgumentError(messages.URL_MISSING);
    } else if (check.not.string(credentials.url)) {
      throw new InvalidArgumentError(messages.URL_NOT_A_STRING);
    } else if (check.not.match(credentials.url, urlFormatRegex)) {
      throw new InvalidArgumentError(messages.URL_INVALID);
    }

    // Check user.
    if (check.not.assigned(credentials.user)) {
      throw new NoArgumentError(messages.USER_MISSING);
    } else if (check.not.string(credentials.user)) {
      throw new InvalidArgumentError(messages.USER_NOT_A_STRING);
    }

    // Check password.
    if (check.not.assigned(credentials.pass)) {
      throw new NoArgumentError(messages.PASSWORD_MISSING);
    } else if (check.not.string(credentials.pass)) {
      throw new InvalidArgumentError(messages.PASSWORD_NOT_A_STRING);
    }

    // Check API version.
    if (
      check.assigned(credentials.version) &&
      check.not.string(credentials.version)
    ) {
      throw new InvalidArgumentError(messages.VERSION_NOT_A_STRING);
    }
  }

  /**
   * Returns the relative URL to the Gambio REST-API.
   * @param {string} version API version.
   * @return {string} Path to API file.
   * @private
   */
  _getRelativeApiUrl(version) {
    // Relative path to API file.
    const apiUrl = `/api.php/${version}`;

    // Return file path.
    return apiUrl;
  }
}

// Export class.
module.exports = GambioApi;
