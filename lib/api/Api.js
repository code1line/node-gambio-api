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

const errors = require('common-errors');

const Validator = require('./../Validator');

/**
 * Class representing API base class.
 */
class Api {

  /**
   * Creates a base API instance.
   *
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */
  constructor(url, auth) {
    // Validate the provided parameters.
    this._validate(url, auth);

    // Set REST-API URL as property.
    this.url = url;

    // Set authentication object as property.
    this.auth = auth;
  }

  /**
   * Returns the API endpoint URL suffix.
   * Note, that this method has to be modified in subclasses.
   *
   * @return {String}
   */
  _getSuffix() {
    return '/defaultEndpoint';
  }

  /**
   * Returns the complete URL to the API endpoint.
   *
   * @return {String}
   * @private
   */
  _getEndpointUrl() {
    return this.url + this._getSuffix();
  }

  /**
   * Returns the provided authentication credentials object.
   *
   * @return {Object}
   * @private
   */
  _getAuth() {
    return this.auth;
  }

  /**
   * Validates the provided constructor parameters.
   *
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   *
   * @throws ArgumentNullError  If an argument is missing.
   * @throws ArgumentError      If an argument is invalid.
   *
   * @private
   */
  _validate(url, auth) {
    // Check URL.
    Validator.checkUrl(url, 'Endpoint URL');

    // Check authentication credentials object.
    Validator.checkObject(auth, 'Authentication credentials object');

    // Check authentication user.
    Validator.checkString(auth.user, 'Authentication user');

    // Check authentication password.
    Validator.checkString(auth.pass, 'Authentication password');
  }

  /**
   * Converts a provided hash of sorting order directives to URL parameters.
   *
   * @param {Object} sorting Sorting criteria hash.
   * @return {String} Composed URL parameters.
   * @throws ArgumentError If a sorting direction value is not valid.
   * @example
   * 	const UrlParams = Api.convertSortingObject({ id: 'desc' });
   *  console.log(urlParams); // outputs 'sort=-id'.
   *
   * @private
   */
  _convertSortingObject(sorting) {
    // Composed URL.
    let url = 'sort=';

    // Sign container.
    const signs = {
      asc: '+',
      desc: '-',
    };

    // Iterate over each entry in sorting object.
    Object.keys(sorting).forEach((fieldName, index) => {
      // Determine if current iteration is the last one.
      const isLastIteration = index === Object.keys(sorting).length - 1;

      // Shortcut to key's value.
      const value = sorting[fieldName];

      // Append parameter to URL if value is a valid sorting direction.
      if (value === 'asc' || value === 'desc') {
        // Compose sorting direction and field name.
        let parameter = signs[value] + fieldName;

        // Append comma to parameter only if current interation is not the last one.
        // This prevents having a trailing comma in the composed URL.
        if (!isLastIteration) parameter += ',';

        // Append created parameter to URL.
        url += parameter;
      } else {
        // Throw error if value does not match a valid sorting direction.
        throw new errors.ArgumentError('Sorting value');
      }
    });

    // Returned composed URL.
    return url;
  }
}

module.exports = Api;
