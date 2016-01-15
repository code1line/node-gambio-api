/**
 * node-gambio-api
 *
 * A low-level Node.js API client for Gambio.
 *
 * This module provides methods to retrieve data
 * from a Gambio shop over the REST-API.
 *
 * @version 0.1.0
 * @author Ronald Loyko
 * @license MIT
 */

'use strict';

class GambioApi {

  /**
   * Creates a Gambio API instance with the provided credentials.
   *
   * @param  {object} credentials Server credentials.
   * @param  {string} credentials.url URL to Gambio shop.
   * Examples: 'http://my-shop.de', 'https://mypage.de/shop'.
   * @param  {string} credentials.user Login user. Example: 'admin@shop.de'.
   * @param  {string} credentials.pass Login password. Example: '12345'.
   */
  constructor(credentials) {
    // Validate credentials (throws error if not valid).
    this._validateCredentials(credentials);

    // Set credentials as property.
    this.credentials = credentials;
  }

  /**
   * Validates the provided credentials.
   * @private
   */
  _validateCredentials(credentials) {
    // Regular expression to check URL format against.
    const urlRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check existence of credentials parameter.
    if (!credentials) {
      throw new Error('Missing credentials parameter object');
    }

    // Check type of credentials parameter.
    if (typeof credentials !== 'object') {
      throw new Error('Credentials parameter is not an object');
    }

    // Check existence of URL property.
    if (!credentials.url) {
      throw new Error('Missing API url');
    }

    // Check type of URL property.
    if (typeof credentials.url !== 'string') {
      throw new Error('API url is not a string');
    }

    // Check format validity of URL property.
    if (!credentials.url.match(urlRegex)) {
      throw new Error('API url is not valid');
    }

    // Check existence of user property.
    if (!credentials.user) {
      throw new Error('Missing authentication user');
    }

    // Check type of user property.
    if (typeof credentials.user !== 'string') {
      throw new Error('User is not a string');
    }

    // Check existence of password property.
    if (!credentials.pass) {
      throw new Error('Missing authentication password');
    }

    // Check type of password property.
    if (typeof credentials.pass !== 'string') {
      throw new Error('User is not a string');
    }
  }

  /**
   * Returns the path to the API file.
   * @return {string} Path to API file.
   */
  getApiUrl() {
    // Relative path to API file.
    const apiFilepath = '/api.php/v2';

    // Return composed shop API url.
    return this.credentials.url + apiFilepath;
  }
}

// Export class.
module.exports = GambioApi;
