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
    // Regular expression to check URL format against.
    const urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check credentials parameter.
    if (check.not.assigned(credentials)) {
      throw new NoArgumentError('Missing credentials object');
    } else if (check.not.object(credentials)) {
      throw new InvalidArgumentError('Credentials is not an object');
    }

    // Check URL.
    if (check.not.assigned(credentials.url)) {
      throw new NoArgumentError('Missing url');
    } else if (check.not.string(credentials.url)) {
      throw new InvalidArgumentError('URL is not a string');
    } else if (check.not.match(credentials.url, urlRegex)) {
      throw new InvalidArgumentError('Invalid URL');
    }

    // Check user.
    if (check.not.assigned(credentials.user)) {
      throw new NoArgumentError('Missing user');
    } else if (check.not.string(credentials.user)) {
      throw new InvalidArgumentError('User is not a string');
    }

    // Check password.
    if (check.not.assigned(credentials.pass)) {
      throw new NoArgumentError('Missing password');
    } else if (check.not.string(credentials.pass)) {
      throw new InvalidArgumentError('Password is not a string');
    }

    // Check API version.
    if (
      check.assigned(credentials.version) &&
      check.not.string(credentials.version)
    ) {
      throw new InvalidArgumentError('Version is not a string');
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
