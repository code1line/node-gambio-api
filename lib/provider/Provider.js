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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var check = require('check-types');
var errors = require('common-errors');

var Validator = require('./../Validator');

/**
 * Class representing API base class.
 */

var Api = function () {
  /**
   * Creates a base API instance.
   *
   * @param {String} url        URL to REST-API.
   * @param {Object} auth       Authentication credentials.
   * @param {String} auth.user  Login user.
   * @param {String} auth.pass  Login password.
   */

  function Api(url, auth) {
    _classCallCheck(this, Api);

    // Validate the provided parameters.
    this._validate(url, auth);

    // Set REST-API URL as property.
    this.url = url;

    // Set authentication object as property.
    this.auth = auth;
  }

  /**
   * Returns the API endpoint URL suffix.
   * Note, that this method has to be implented in subclasses.
   *
   * @return {String}
   * @private
   */


  _createClass(Api, [{
    key: '_getSuffix',
    value: function _getSuffix() {
      // Implementation in extending classes could look like this:
      // return '/defaultEndpoint';
      throw new errors.NotImplementedError('_getSuffix method has not been implemented');
    }

    /**
     * Returns the complete URL to the API endpoint.
     *
     * @return {String}
     * @private
     */

  }, {
    key: '_getEndpointUrl',
    value: function _getEndpointUrl() {
      return this.url + this._getSuffix();
    }

    /**
     * Returns the provided authentication credentials object.
     *
     * @return {Object}
     * @private
     */

  }, {
    key: '_getAuth',
    value: function _getAuth() {
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

  }, {
    key: '_validate',
    value: function _validate(url, auth) {
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

  }, {
    key: '_convertSortingObject',
    value: function _convertSortingObject(sorting) {
      // Check sorting object.
      Validator.checkObject(sorting, 'Sorting object');

      // Composed URL parameter.
      var url = 'sort=';

      // Sign container.
      var signs = {
        asc: '+',
        desc: '-'
      };

      // Iterate over each entry in sorting object.
      Object.keys(sorting).forEach(function (fieldName, index) {
        // Determine if current iteration is the last one.
        var isLastIteration = index === Object.keys(sorting).length - 1;

        // Shortcut to key's value.
        var value = sorting[fieldName];

        // Append sorting parameter to URL parameter if value is a valid sorting direction.
        if (value === 'asc' || value === 'desc') {
          // Compose sorting direction and field name.
          var parameter = signs[value] + fieldName;

          // Append comma to parameter only if current interation is not the last one.
          // This prevents having a trailing comma in the composed URL.
          if (!isLastIteration) parameter += ',';

          // Append created parameter to URL parameter.
          url += parameter;
        } else {
          // Throw error if value does not match a valid sorting direction.
          throw new errors.ArgumentError('Sorting value');
        }
      });

      // Returned composed URL parameter string.
      return url;
    }

    /**
     * Converts a provided array of field names limit directives to URL parameters.
     *
     * @param {String[]} limits Field names.
     * @return {String}
     * @throws ArgumentError If a field name value is not a string.
     * @private
     */

  }, {
    key: '_convertFieldLimitArray',
    value: function _convertFieldLimitArray(limits) {
      // Check limits array.
      Validator.checkTypedArray(limits, 'string', 'Limiting field names array');

      // Composed URL.
      var url = 'fields=';

      // Check if all values in provided array are strings.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = limits[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var fieldName = _step.value;

          Validator.checkString(fieldName, 'Limit field name');
        }

        // Generate a string of comma-separated field names.
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var fieldList = limits.join();

      // Apppend created field name list to URL.
      url += fieldList;

      // Returned composed URL parameter string.
      return url;
    }

    /**
     * Checks if manipulator arguments are assigned and valid.
     * If so, the called manipulator methods will create URL parameters
     * and this method will finally append the created parameters to the provided URL.
     *
     * Optionally, is it possible to appendcustom parameters to the URL by passing in a string array.
     *
     * @param {String}    url                       API endpoint URL to be manipulated.
     * @param {Object}    [sorting]                 Sorting criteria hash.
     * @param {String[]}  [limits]                  Limiting field names.
     * @param {String[]}  [additionalParameters]    Additional custom parameters.
     *
     * @return {String}
     * @throws ArgumentError If an argument does not match the expected type.
     * @private
     */

  }, {
    key: '_modifyUrlByManipulatorArguments',
    value: function _modifyUrlByManipulatorArguments(url, sorting, limits, additionalParameters) {
      // Shortcut to assign state parameters.
      var isSetSorting = check.assigned(sorting);
      var isSetLimits = check.assigned(limits);
      var isSetAddtionalParameters = check.assigned(additionalParameters);

      // Validate URL.
      Validator.checkUrl(url, 'API endpoint URL');

      // Set URL.
      var modifiedUrl = String(url);

      // Check sorting object.
      if (isSetSorting) {
        Validator.checkObject(sorting, 'Sorting hash');
      }

      // Check limiting field names.
      if (isSetLimits) {
        Validator.checkTypedArray(limits, 'string', 'Limiting field names array');
      }

      // Check additional parameters.
      if (isSetAddtionalParameters) {
        Validator.checkTypedArray(additionalParameters, 'string', 'Additional parameters');
      }

      // Append sorting parameters to URL, if provided.
      if (isSetSorting) {
        modifiedUrl += this._getParameterConnector(modifiedUrl) + this._convertSortingObject(sorting);
      }

      // Append ampersand and limiting field names parameters to URL, if provided.
      if (isSetLimits) {
        modifiedUrl += this._getParameterConnector(modifiedUrl) + this._convertFieldLimitArray(limits);
      }

      // Append ampersand and custom parameters, if provided.
      if (isSetAddtionalParameters) {
        modifiedUrl += this._getParameterConnector(modifiedUrl) + additionalParameters.join('&');
      }

      // Return modified URL.
      return modifiedUrl;
    }

    /**
     * Looks in the provided URL string for a question mark `?`.
     * If so, an ampersand `&` or otherwise a question mark will be returned.
     *
     * @param  {String} url Checked URL.
     * @throws ArgumentError If argument does not match the expected type.
     * @return {String}
     */

  }, {
    key: '_getParameterConnector',
    value: function _getParameterConnector(url) {
      var questionMark = '?';
      var ampersand = '&';

      // Validate URL.
      Validator.checkUrl(url);

      // Return either question mark or ampersand.
      return check.contains(url, questionMark) ? ampersand : questionMark;
    }
  }]);

  return Api;
}();

module.exports = Api;