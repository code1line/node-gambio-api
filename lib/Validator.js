/**
 * @name Validator
 *
 * @description Checks different arguments for its validity.
 *
 * @example
 * 	const Validator = require('./Validator');
 * 	const myWrongUrl = '=($/=§(/$=))';
 *
 * 	try {
 * 		Validator.checkUrl(myWrongUrl);
 * 	} catch (error) {
 * 		console.error(error); // Would output log with InvalidArgumentError.
 * 	}
 */

'use strict';

const check = require('check-types');

const messages = require('./provider/messages');
const NoArgumentError = require('./error/NoArgumentError');
const InvalidArgumentError = require('./error/InvalidArgumentError');

/**
 * Class representing a validator.
 */
class Validator {

  /**
   * Checks optional type argument.
   *
   * @param  {string} [type] Entity type name.
   *
   * @throws InvalidArgumentError On invalid argument type.
   *
   * @private
   */
  _checkTypeArgument(type) {
    // Check type of `type` argument, if provided.
    if (check.assigned(type) && check.not.string(type)) {
      throw new InvalidArgumentError(`Type argument ${messages.IS_NOT_STRING}`);
    }
  }

  /**
   * Checks an object argument for existence and type.
   *
   * @param  {object} objectParam   Object parameter provided.
   * @param  {string} [type]        Object entity name.
   *
   * @throws NoArgumentError        On missing object.
   * @throws InvalidArgumentError   On wrong type.
   *
   * @example
   * 	// Throws 'InvalidArgumentError: Server credentials is not an object'.
   * 	checkObject('asdsad', 'Server credentials');
   *
   * @static
   */
  static checkObject(object, type) {
    // Check and assign object entity name for error message.
    this._checkTypeArgument(type);
    const objectEntity = check.assigned(type) ? type : 'Object';

    // Check existence.
    if (check.not.assigned(object)) {
      throw new NoArgumentError(`${objectEntity} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.object(object)) {
      throw new InvalidArgumentError(`${objectEntity} ${messages.IS_NOT_OBJECT}`);
    }
  }

  /**
   * Checks an URL argument for existence, type and format validity.
   *
   * @param {string} url URL provided.
   *
   * @throws NoArgumentError      On missing URL.
   * @throws InvalidArgumentError On wrong type and invalid URL format.
   *
   * @static
   */
  static checkUrl(url) {
    // Regular expression to test the URL format against.
    const formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    this.checkString();
    // Check existence.
    if (check.not.assigned(url)) {
      throw new NoArgumentError(`URL ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.string(url)) {
      throw new InvalidArgumentError(`URL ${messages.IS_NOT_STRING}`);
    }

    // Check format.
    if (check.not.match(url, formatRegex)) {
      throw new InvalidArgumentError(`URL ${messages.IS_INVALID}`);
    }
  }

  /**
   * Checks a number argument for existence and type.
   *
   * @param  {number} number Number provided.
   *
   * @throws NoArgumentError      On missing Password.
   * @throws InvalidArgumentError On wrong type.
   */
  checkNumber(number, type) {
    // Check and assign number entity name for error message.
    this._checkTypeArgument(type);
    const numberEntity = check.assigned(type) ? type : messages.NUMBER;

    // Check existence.
    if (check.not.assigned(number)) {
      const message = `${numberEntity} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.number(number)) {
      const message = `${numberEntity} ${messages.IS_NOT_NUMBER}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks a string argument for existence and type.
   *
   * @param  {string} string String provided.
   *
   * @throws NoArgumentError      On missing Password.
   * @throws InvalidArgumentError On wrong type.
   */
  checkString(string, type) {
    // Check and assign string entity name for error message.
    this._checkTypeArgument(type);
    const stringEntity = check.assigned(type) ? type : messages.STRING;

    // Check existence.
    if (check.not.assigned(string)) {
      const message = `${stringEntity} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.string(string)) {
      const message = `${stringEntity} ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }
  }
}

// Export instantiated class.
module.exports = new Validator();
