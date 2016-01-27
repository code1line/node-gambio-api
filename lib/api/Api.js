/**
 * @name Base API
 * @description API base class. Meant to be extended by other API classes.
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
   * Note, that all extending classes need to change the value in `_getSuffix`
   *
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */
  constructor(parameters) {
    // Validate the provided parameters.
    this._validate(parameters);

    // Set parameters as property.
    this.parameters = parameters;
  }

  _getSuffix() {
    // NOTE: OVERRIDE
  }

  _getEndpointUrl() {
    return this.parameters.url + this._getSuffix();
  }

  _getAuth() {
    return this.parameters.auth;
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
   * Converts a provided hash of sorting order directives to URL parameters.
   *
   * @param {object} sorting Sorting criteria hash.
   *
   * @return {string} Composed URL parameters.
   *
   * @example
   * 	const UrlParams = Helper.convertSortingObject({ id: 'desc' });
   *  console.log(urlParams); // outputs 'sort=-id'.
   *
   * @static
   * @private
   */
  static convertSortingObject(sorting) {
    // Composed URL.
    let url = 'sort=';

    // Object containing the signs for sorting order.
    const signHash = {
      asc: '+',
      desc: '-',
    };

    // Iterate over each entry in sorting object
    // and try to append the respective sign '+'/'-' and field name to the URL.
    for (const fieldName in sorting) {
      if (sorting.hasOwnProperty(fieldName)) {
        // Shortcut to value.
        const value = sorting[fieldName];

        // Check if field value is 'asc' or 'desc' and append sign and field name to URL.
        if (check.contains(value, 'asc') || check.contains(value, 'desc')) {
          // Composed parameter (sign and field name).
          const parameter = `${signHash[value]}${fieldName},`;

          // Append composed parameter to URL.
          url += parameter;
        }
      }
    }
}

module.exports = Api;
