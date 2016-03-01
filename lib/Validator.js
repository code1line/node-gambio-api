/**
 * @name Validator
 * @description Checks different arguments for its validity.
 * @example
 * 	const Validator = require('./Validator');
 * 	const myWrongUrl = '=($/=§(/$=))';
 *
 * 	try {
 * 		Validator.checkUrl(myWrongUrl);
 * 	} catch (error) {
 * 		console.error(error); // Would output an ArgumentError.
 * 	}
 */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var check = require('check-types');
var errors = require('common-errors');

var messages = require('./provider/messages');

/**
 * Class representing a validator.
 */

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: '_checkTypeArgument',


    /**
     * Checks optional type argument.
     *
     * @param {String} [type] Entity type name.
     * @throws ArgumentError If argument type does not match.
     * @private
     * @static
     */
    value: function _checkTypeArgument(type) {
      if (check.assigned(type) && check.not.string(type)) {
        throw new errors.ArgumentError('Type argument ' + messages.IS_NOT_STRING);
      }
    }

    /**
     * Checks existence and type of an object.
     *
     * @param {Object} object  Checked object.
     * @param {String} [type]  Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: Server credentials is not an object'.
     * 	// Because an object is expected, but a string has been given.
     *
     * 	Validator.checkObject('asdsad', 'Server credentials');
     *
     * @static
     */

  }, {
    key: 'checkObject',
    value: function checkObject(object, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign object entity name.
      var entityName = check.assigned(type) ? type : 'Object';

      // Check existence.
      if (check.not.assigned(object)) {
        throw new errors.ArgumentNullError(entityName + ' ' + messages.IS_MISSING);
      }

      // Check type.
      if (check.not.object(object)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_NOT_OBJECT);
      }
    }

    /**
     * Checks existence, type and format validity of an URL.
     *
     * @param {String} url Checked URL.
     * @param {String} [type]  Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match or is invalid.
     *
     * @example
     * 	// Throws 'ArgumentError: URL is not valid'.
     * 	// Because a valid URL is expected, but a simple string has been given.
     *
     * 	Validator.checkUrl('asdsad');
     *
     * @static
     */

  }, {
    key: 'checkUrl',
    value: function checkUrl(url, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign URL entity name.
      var entityName = check.assigned(type) ? type : 'URL';

      /**
       * Regular expression to test the URL format against.
       *
       * Will match following cases:
       * - http://www.foufos.gr
       * - https://www.foufos.gr
       * - http://foufos.gr
       * - http://www.foufos.gr/kino
       * - http://www.t.co
       * - http://t.co
       * - http://werer.gr
       * - www.foufos.gr
       *
       * Will NOT match the following:
       * - www.foufos
       * - http://www.foufos
       * - http://foufos
       *
       * @see http://stackoverflow.com/a/17773849
       * @type {RegExp}
       */
      var formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

      // Check string.
      this.checkString(url, entityName);

      // Check URL format.
      if (check.not.match(url, formatRegex)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_INVALID);
      }
    }

    /**
     * Checks existence and type of a number.
     *
     * @param {Number} number Checked number.
     * @param {String} [type] Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: Number is not valid'.
     * 	// Because a number is expected, but a string has been given.
     *
     * 	Validator.checkNumber('asdsad');
     *
     * @static
     */

  }, {
    key: 'checkNumber',
    value: function checkNumber(number, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign number entity name.
      var entityName = check.assigned(type) ? type : 'Number';

      // Check existence.
      if (check.not.assigned(number)) {
        throw new errors.ArgumentNullError(entityName + ' ' + messages.IS_MISSING);
      }

      // Check type.
      if (check.not.number(number)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_NOT_NUMBER);
      }
    }

    /**
     * Checks existence and type of a string.
     *
     * @param {String} string Checked string.
     * @param {String} [type] Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: String is not valid'.
     * 	// Because a string is expected, but a number has been given.
     *
     * 	Validator.checkString(3);
     *
     * @static
     */

  }, {
    key: 'checkString',
    value: function checkString(string, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign string entity name.
      var entityName = check.assigned(type) ? type : 'String';

      // Check existence.
      if (check.not.assigned(string)) {
        throw new errors.ArgumentNullError(entityName + ' ' + messages.IS_MISSING);
      }

      // Check type.
      if (check.not.string(string)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_NOT_STRING);
      }
    }

    /**
     * Checks existence and type of an integer.
     *
     * @param {Number} integer Checked integer.
     * @param {String} [type]  Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: Number is not valid'.
     * 	// Because an integer is expected, but a string has been given.
     *
     * 	Validator.checkinteger('asdsad');
     *
     * @static
     */

  }, {
    key: 'checkInteger',
    value: function checkInteger(integer, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign integer entity name.
      var entityName = check.assigned(type) ? type : 'Integer';

      // Check number.
      this.checkNumber(integer, type);

      // Check integer type.
      if (check.not.integer(integer)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_NOT_INTEGER);
      }
    }

    /**
     * Checks existence and type of an array.
     *
     * @param {Array}  array   Checked array.
     * @param {String} [type]  Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: Blubb is not an array'.
     * 	// Because an array is expected, but a string has been given.
     *
     * 	Validator.checkArray('asdsad', 'Blubb');
     *
     * @static
     */

  }, {
    key: 'checkArray',
    value: function checkArray(array, type) {
      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign array entity name.
      var entityName = check.assigned(type) ? type : 'Array';

      // Check existence.
      if (check.not.assigned(array)) {
        throw new errors.ArgumentNullError(entityName + ' ' + messages.IS_MISSING);
      }

      // Check type.
      if (check.not.array(array)) {
        throw new errors.ArgumentError(entityName + ' ' + messages.IS_NOT_ARRAY);
      }
    }

    /**
     * Checks existence and type of an typed array.
     *
     * Following types are available:
     * - 'string'
     * - 'integer'
     * - 'object'
     * - 'number'
     *
     * @param {Array}   typedArray    Checked typed array.
     * @param {String}  expectedType  Expected array content type (e.g.: 'string', 'integer').
     * @param {String}  [type]        Entity name.
     *
     * @throws ArgumentNullError  If argument is not assigned.
     * @throws ArgumentError      If argument or array content type does not match.
     *
     * @example
     * 	// Throws 'ArgumentError: String array contains value of unexpected type'.
     * 	// Because string contents are expected, but a number has been set.
     *
     * 	Validator.checkTypedArray(['text', 2], 'string', 'String array');
     *
     * @static
     */

  }, {
    key: 'checkTypedArray',
    value: function checkTypedArray(typedArray, expectedType, type) {
      // Valid expected type values.
      var validExpectedTypes = ['string', 'integer', 'object', 'number'];

      // Check entity type for error message.
      this._checkTypeArgument(type);

      // Assign typed array entity name.
      var entityName = check.assigned(type) ? type : 'Typed array';

      // Check array.
      this.checkArray(typedArray, entityName);

      // Check expected type argument.
      Validator.checkString(expectedType, 'Expected array type');
      if (check.not.includes(validExpectedTypes, expectedType)) {
        throw new errors.ArgumentError('Expected array type ' + messages.IS_INVALID);
      }

      // Iterate over the values and check value type.
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = typedArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          if (check.not[expectedType](value)) {
            throw new errors.ArgumentError(entityName + ' ' + messages.ARRAY_CONTAINS_INVALID_CONTENT);
          }
        }
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
    }
  }]);

  return Validator;
}();

module.exports = Validator;