/**
 * Api.
 * API base class. Meant to be extended by other API classes.
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

// Node modules dependencies.
const check = require('check-types');

// Library dependencies.
const Validator = require('./../Validator');

// Class definition.
class Api {

  /**
   * Creates an API instance.
   *
   * @param  {string} parameters        Server parameters.
   * @param  {string} parameters.url    URL to main REST-API.
   * @param  {string} parameters.user   Authentication user.
   * @param  {string} parameters.pass   Authentication password.
   */
  constructor(parameters) {
    // Validate parameters.
    this._validate(parameters);

    // Set composed URL (main REST-API + endpoint suffix) as property.
    this.url = parameters.url + this._getSuffix();

    // Set authentication credentials as property.
    this.auth = {
      user: parameters.user,
      pass: parameters.pass,
    };
  }

  /**
   * Validates credentials.
   *
   * @param {object} parameters Server parameters.
   * @throws NoArgumentError On missing arguments.
   * @throws InvalidArgumentError On invalid arguments.
   * @private
   */
  _validate(parameters) {
    // Check object parameter.
    Validator.checkObject(parameters);

    // Check URL.
    Validator.checkUrl(parameters.url);

    // Check user.
    Validator.checkUser(parameters.user);

    // Check password.
    Validator.checkPassword(parameters.pass);
  }

  /**
   * Returns API's endpoint URL suffix. Meant to be overidden.
   *
   * @return {string} URL suffix.
   * @private
   */
  _getSuffix() {
    // Suffix to append to URL.
    const suffix = '/';

    // Return suffix.
    return suffix;
  }

  /**
   * Converts a provided hash of sorting order directives to an URL.
   * Returns the composed URL.
   *
   * @example
   * 	const urlParams = this._convertSortingObjectToUrlParameters({
   * 		lastname: 'asc'
   * 	});
   *
   * console.log(urlParams); // outputs 'sort=+lastname'.
   *
   * @param  {object} sorting Sorting criteria hash.
   * @return {string}         Composed URL.
   * @private
   */
  _convertSortingObjectToUrlParameters(sorting) {
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

    // Return composed url.
    return url;
  }
}

// Export class.
module.exports = Api;
