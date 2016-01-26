/**
 * @name Base API
 *
 * @description API base class. Meant to be extended by other API classes.
 *
 * @example
 * 	class MyApi extends Api {
 * 		_getSuffix() {
 * 			return '/subroute/to/api';
 * 		}
 * 	}
 *
 * 	const instanceOfMyApi = new MyApi({
 * 		url: 'http://mysite.com/api/v2',
 * 		user: 'user',
 * 		pass: 'password',
 * 	});
 */

'use strict';

const check = require('check-types');

const Validator = require('./../Validator');

/**
 * Class representing API base class.
 */
class Api {

  /**
   * Creates a base API instance.
   *
   * @param  {string} parameters        Server parameters.
   * @param  {string} parameters.url    URL to main REST-API.
   * @param  {string} parameters.user   Authentication user.
   * @param  {string} parameters.pass   Authentication password.
   */
  constructor(parameters) {
    /**
     * Validates the provided parameters.
     *
     * @throws NoArgumentError      On missing parameters.
     * @throws InvalidArgumentError On invalid arguments provided.
     */
    this._validate(parameters);

    /**
     * Set composed URL (main REST-API + endpoint suffix) as property.
     * @property {string} url Composed URL.
     */
    this.url = parameters.url + this._getSuffix();

    /**
     * Set authentication credentials as property.
     *
     * @property {object} auth      Authentication credentials.
     * @property {string} auth.user Authentication user.
     * @property {string} auth.pass Authentication password.
     */
    this.auth = {
      user: parameters.user,
      pass: parameters.pass,
    };
  }

  /**
   * Validates credentials.
   *
   * @param {object} parameters Server parameters.
   *
   * @throws NoArgumentError      On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   *
   * @private
   */
  _validate(parameters) {
    /**
     * Validate object parameter.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkObject(parameters);

    /**
     * Validate URL.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkUrl(parameters.url);

    /**
     * Validate user.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkUser(parameters.user);

    /**
     * Validate password.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On invalid argument.
     */
    Validator.checkPassword(parameters.pass);
  }

  /**
   * Returns API's endpoint URL suffix. Must be overidden.
   *
   * @return {string} URL suffix.
   *
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/';

    // Return suffix.
    return suffix;
  }
}

module.exports = Api;
