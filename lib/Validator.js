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

const check = require('check-types');
const errors = require('common-errors');

const messages = require('./provider/messages');

/**
 * Class representing a validator.
 */
class Validator {

  /**
   * Checks optional type argument.
   *
   * @param {String} [type] Entity type name.
   * @throws ArgumentError If argument type does not match.
   * @private
   * @static
   */
  static _checkTypeArgument(type) {
    if (check.assigned(type) && check.not.string(type)) {
      throw new errors.ArgumentError(`Type argument ${messages.IS_NOT_STRING}`);
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
  static checkObject(object, type) {
    // Check entity type for error message.
    this._checkTypeArgument(type);

    // Assign object entity name.
    const entityName = check.assigned(type) ? type : 'Object';

    // Check existence.
    if (check.not.assigned(object)) {
      throw new errors.ArgumentNullError(`${entityName} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.object(object)) {
      throw new errors.ArgumentError(`${entityName} ${messages.IS_NOT_OBJECT}`);
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
  static checkUrl(url, type) {
    // Check entity type for error message.
    this._checkTypeArgument(type);

    // Assign URL entity name.
    const entityName = check.assigned(type) ? type : 'URL';

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
    const formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check string.
    this.checkString(url, entityName);

    // Check URL format.
    if (check.not.match(url, formatRegex)) {
      throw new errors.ArgumentError(`${entityName} ${messages.IS_INVALID}`);
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
  static checkNumber(number, type) {
    // Check entity type for error message.
    this._checkTypeArgument(type);

    // Assign number entity name.
    const entityName = check.assigned(type) ? type : 'Number';

    // Check existence.
    if (check.not.assigned(number)) {
      throw new errors.ArgumentNullError(`${entityName} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.number(number)) {
      throw new errors.ArgumentError(`${entityName} ${messages.IS_NOT_NUMBER}`);
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
  static checkString(string, type) {
    // Check entity type for error message.
    this._checkTypeArgument(type);

    // Assign string entity name.
    const entityName = check.assigned(type) ? type : 'String';

    // Check existence.
    if (check.not.assigned(string)) {
      throw new errors.ArgumentNullError(`${entityName} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.string(string)) {
      throw new errors.ArgumentError(`${entityName} ${messages.IS_NOT_STRING}`);
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
  static checkInteger(integer, type) {
    // Check entity type for error message.
    this._checkTypeArgument(type);

    // Assign integer entity name.
    const entityName = check.assigned(type) ? type : 'Integer';

    // Check number.
    this.checkNumber(integer, type);

    // Check integer type.
    if (check.not.integer(integer)) {
      throw new errors.ArgumentError(`${entityName} ${messages.IS_NOT_INTEGER}`);
    }
  }
}

module.exports = Validator;
