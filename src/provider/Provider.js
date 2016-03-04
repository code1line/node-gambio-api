import _ from 'lodash';
import RequestDispatcher from './../RequestDispatcher';
import checkUrl from './../helper/checkUrl';

/**
 * Class representing a base provider.
 * @description Provider base class. Meant to be extended by other provider classes.
 * @example
 * 	class myProvider extends Provider {
 * 		_getSuffix() {
 * 			return '/subroute/to/api';
 * 		}
 * 	}
 *
 * 	const instanceOfmyProvider = new myProvider({
 * 		url: 'http://mysite.com/api/v2',
 * 		user: 'user',
 * 		pass: 'password',
 * 	});
 */
class Provider {
  /**
   * Creates a base provider instance and initializes a request dispatcher.
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */
  constructor(url, auth) {
    this._validateParameters(url, auth);

    this.url = url;
    this.auth = auth;

    this.dispatcher = new RequestDispatcher(auth);
  }

  /**
   * Returns the API endpoint URL suffix.
   * Note, that this method has to be implented in subclasses like this:
   *   _getSuffix() {
   *   		return '/myroute';
   *   }
   * @return {String}
   * @throws {Error} If method has not been overridden.
   * @override
   * @private
   */
  _getSuffix() {
    throw new Error('_getSuffix method is not implemented');
  }

  /**
   * Returns the complete URL to API endpoint.
   * @return {String}
   * @private
   */
  _getEndpointUrl() {
    return this.url + this._getSuffix();
  }

  /**
   * Returns the provided authentication credentials object.
   * @return {Object}
   * @private
   */
  _getAuth() {
    return this.auth;
  }

  /**
   * Validates the provided constructor parameters.
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @throws {Error} On missing or invalid parameters.
   * @private
   */
  _validateParameters(url, auth) {
    // Check URL.
    checkUrl(url);

    // Check authentication object.
    if (_.isNil(auth) || !_.isObject(auth)) {
      throw new Error('Missing or invalid authentication object');
    }

    // Check user.
    if (_.isNil(auth.user) || !_.isString(auth.user)) {
      throw new Error('Missing or invalid user');
    }

    // Check password.
    if (_.isNil(auth.pass) || !_.isString(auth.pass)) {
      throw new Error('Missing or invalid password');
    }
  }
}

export default Provider;
