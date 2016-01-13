/**
 * CredentialsValidator.
 * Validates the credentials object and its properties.
 *
 * @example
 * 		const crx = {
 * 			url: 'https://www.shop.de/admin/api.php/v2',
 * 			user: 'admin@shop.de',
 * 			pass: '12345',
 * 		}
 *
 * 		const validator = new CredentialsValidator(crx);
 *
 *   	try {
 *   		validator.validate();
 *   	} catch (error) {
 *   		console.error(error);
 *   	}
 */

'use strict';

class CredentialsValidator {
  /**
   * Constructor.
   * Saves credentials as property.
   * @param  {object} credentials Server credentials.
   */
  constructor(credentials) {
    this.credentials = credentials;
  }

  /**
   * Validates the credentials.
   */
  validate() {
    // Validate credentials object.
    this._validateParameterObject();

    // Validate URL.
    this._validateUrl();

    // Validate user.
    this._validateUser();

    // Validate password.
    this._validatePass();
  }

  /**
   * Validates credientials parameter object.
   * @throws Error on missing or invalid argument.
   * @private
   */
  _validateParameterObject() {
    // Check existence.
    if (!this.credentials) {
      throw new Error('Missing credentials parameter object');
    }

    // Check type.
    if (typeof this.credentials !== 'object') {
      throw new Error('Credentials parameter is not an object');
    }
  }

  /**
   * Validates API URL.
   * @throws Error on missing or invalid argument.
   * @private
   */
  _validateUrl() {
    // Regular expression to check URL format against.
    const regex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check existence.
    if (!this.credentials.url) {
      throw new Error('Missing API url');
    }

    // Check type.
    if (typeof this.credentials.url !== 'string') {
      throw new Error('API url is not a string');
    }

    // Check URL format validity.
    if (!this.credentials.url.match(regex)) {
      throw new Error('API url is not valid');
    }
  }

  /**
   * Validates user.
   * @throws Error on missing or invalid argument.
   * @private
   */
  _validateUser() {
    // Check existence.
    if (!this.credentials.user) {
      throw new Error('Missing authentication user');
    }

    // Check type.
    if (typeof this.credentials.user !== 'string') {
      throw new Error('User is not a string');
    }
  }

  /**
   * Validate password.
   * @throws Error on missing or invalid argument.
   * @private
   */
  _validatePass() {
    // Check existence.
    if (!this.credentials.pass) {
      throw new Error('Missing authentication password');
    }

    // Check type.
    if (typeof this.credentials.pass !== 'string') {
      throw new Error('User is not a string');
    }
  }
}

// Export class.
module.exports = CredentialsValidator;
