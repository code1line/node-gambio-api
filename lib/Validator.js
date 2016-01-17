/**
 * Validator.
 *
 * Validates different arguments for its validity.
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

// Node module dependencies.
const check = require('check-types');

// Library dependencies.
const messages = require('./messageContainer');
const NoArgumentError = require('./error/NoArgumentError');
const InvalidArgumentError = require('./error/InvalidArgumentError');

// Class definition.
class Validator {

  /**
   * Checks optinal type argument.
   *
   * @param  {string} [type] Entity type name.
   * @throws InvalidArgumentError On invalid argument type.
   * @private
   */
  _checkTypeArgument(type) {
    // Check type of `type` argument, if provided.
    if (check.assigned(type) && check.not.string(type)) {
      const message = `Type argument ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks an object argument for existence and type.
   *
   * @param  {object} objectParam Object parameter provided.
   * @param  {string} [type] Object entitiy name. Used if the entity's name should appear in error.
   *
   * @throws NoArgumentError On missing object.
   * @throws InvalidArgumentError On wrong type.
   *
   * @example
   * 	// Throws 'InvalidArgumentError: Server credentials is not a string'.
   * 	checkObject('asdsad', 'Server credentials');
   */
  checkObject(objectParam, type) {
    // Check and assign object entity name for error message.
    this._checkTypeArgument(type);
    const objectEntity = check.assigned(type) ? type : messages.PARAM;

    // Check existence.
    if (check.not.assigned(objectParam)) {
      const message = `${objectEntity} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.object(objectParam)) {
      const message = `${objectEntity} ${messages.IS_NOT_OBJECT}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks an URL argument for existence, type and format validity.
   *
   * @param  {string} url URL provided.
   *
   * @throws NoArgumentError On missing URL.
   * @throws InvalidArgumentError On wrong type and invalid URL format.
   */
  checkUrl(url) {
    // Regular expression to test the URL format against.
    const formatRegex = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,}/;

    // Check existence.
    if (check.not.assigned(url)) {
      const message = `${messages.URL} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.string(url)) {
      const message = `${messages.URL} ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }

    // Check format.
    if (check.not.match(url, formatRegex)) {
      const message = `${messages.URL} ${messages.IS_INVALID}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks an user argument for existence and type.
   *
   * @param  {string} user User provided.
   *
   * @throws NoArgumentError On missing User.
   * @throws InvalidArgumentError On wrong type.
   */
  checkUser(user) {
    // Check existence.
    if (check.not.assigned(user)) {
      const message = `${messages.USER} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.string(user)) {
      const message = `${messages.USER} ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks a password argument for existence and type.
   *
   * @param  {string} password Password provided.
   *
   * @throws NoArgumentError On missing Password.
   * @throws InvalidArgumentError On wrong type.
   */
  checkPassword(password) {
    // Check existence.
    if (check.not.assigned(password)) {
      const message = `${messages.PASSWORD} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.string(password)) {
      const message = `${messages.PASSWORD} ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks an ID argument for existence and type
   * and validates if it is an integer.
   *
   * @param  {integer} id ID provided.
   * @param  {string} [type] ID entitiy name. Used if the entity's name should appear in error.
   *
   * @throws NoArgumentError On missing Password.
   * @throws InvalidArgumentError On wrong type.
   *
   * @example
   * 	// Throws 'InvalidArgumentError: Country ID is not a string'.
   * 	checkId('asdsad', 'Country ID');
   */
  checkId(id, type) {
    // Check and assign ID entity name for error message.
    this._checkTypeArgument(type);
    const idEntity = check.assigned(type) ? type : messages.ID;

    // Check existence.
    if (check.not.assigned(id)) {
      const message = `${idEntity} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.number(id)) {
      const message = `${idEntity} ${messages.IS_NOT_NUMBER}`;
      throw new InvalidArgumentError(message);
    }

    // Check if it is an integer.
    if (check.not.integer(id)) {
      const message = `${idEntity} ${messages.IS_NOT_INTEGER}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks an API version argument for existence, type and format validity.
   *
   * @param  {string} version API version provided.
   *
   * @throws NoArgumentError On missing Password.
   * @throws InvalidArgumentError On wrong type.
   */
  checkVersion(version) {
    // Check existence.
    if (check.not.assigned(version)) {
      const message = `${messages.VERSION} ${messages.IS_MISSING}`;
      throw new NoArgumentError(message);
    }

    // Check type.
    if (check.not.string(version)) {
      const message = `${messages.VERSION} ${messages.IS_NOT_STRING}`;
      throw new InvalidArgumentError(message);
    }

    // Check format.
    // String should always start with 'v'.
    if (version.charAt(0) !== 'v') {
      const message = `${messages.VERSION} ${messages.IS_INVALID}`;
      throw new InvalidArgumentError(message);
    }
  }

  /**
   * Checks a number argument for existence and type.
   *
   * @param  {number} number Number provided.
   *
   * @throws NoArgumentError On missing Password.
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
   * @throws NoArgumentError On missing Password.
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
