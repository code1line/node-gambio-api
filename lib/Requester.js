/**
 * Requester.
 * Performs HTTP requests to a given URL.
 */

'use strict';

// Dependencies.
const request = require('request');
const extend = require('extend');
const Promise = require('bluebird');

// Class definition.
class Requester {

  /**
   * Creates an instance to make requests with authentication possible.
   *
   * @param  {string} url URL to REST route.
   * @param  {object} auth Authentication credentials.
   * @param  {string} auth.user Login user.
   * @param  {string} auth.pass Login password.
   */
  constructor(url, auth) {
    // Validate constructor parameters.
    this._validateParameters(url, auth);

    // Assign class properties.
    this.url = url;
    this.auth = auth;
  }

  /**
   * Validates constructor parameter validity.
   *
   * @param  {string} url  URL to REST route.
   * @param  {object} auth Authentication credentials.
   * @throws Error on missing or invalid values.
   * @see #constructor
   */
  _validateParameters(url, auth) {
    // Check URL existence.
    if (!url) {
      throw new Error('Missing URL parameter');
    }

    // Check URL type.
    if (typeof url !== 'string') {
      throw new Error('Wrong type of URL parameter');
    }

    // Check auth existence
    if (!auth) {
      throw new Error('Missing authentication parameter');
    }

    // Check auth type.
    if (typeof auth !== 'object') {
      throw new Error('Wrong type of authentication parameter');
    }
  }

  /**
   * Makes a request and returns a promise containig the response.
   * @param {object} params = {} Additional request parameters.
   * @return {Promise}
   */
  _performRequest(params) {
    // Params default value.
    params = params || {};

    // Default parameters.
    const defaultParams = {
      url: this.url,
      auth: this.auth,
      headers: {
        'User-Agent': 'Node Gambio API client',
      },
    };

    // Extend default request parameters with custom provided ones.
    const requestParameters = extend(true, {}, defaultParams, params);

    // Promise object.
    const promise = new Promise((resolve, reject) => {
      // Make request and handle response.
      request(requestParameters, (error, response, body) => {
        // Reject promise on error.
        if (error) {
          reject(error);
          return;
        }

        // Resolve promise.
        resolve(response, body);
      });
    });

    // Return promise.
    return promise;
  }

  /**
   * Performs a GET request.
   * @return {Promise}
   */
  get() {
    // Request parameters.
    const requestParams = {
      method: 'GET',
    };

    // Return promise.
    return this._performRequest(requestParams);
  }

  post() {}

  delete() {}

  put() {}

  upload() {}

}

// Export class.
module.exports = Requester;
