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
 * 		console.error(error); // Would output an InvalidArgumentError.
 * 	}
 */

'use strict';

const check = require('check-types');

const messages = require('./provider/messages');
const constants = require('./provider/constants');

const ArgumentError = require('./error/NoArgumentError');

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
   * @static
   */
  static _checkTypeArgument(type) {
    // Check type of `type` argument, if provided.
    if (check.assigned(type) && check.not.string(type)) {
      const message = `Type argument ${messages.IS_NOT_STRING}`;
      const code = constants.ARGUMENT_WRONG_TYPE
      throw new ArgumentError(message, code);
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
    /**
     * Check entity type for error message.
     * @throws InvalidArgumentError On wrong type.
     */
    this._checkTypeArgument(type);

    /**
     * Assign object entity name.
     * @type  {string} type Entity type.
     */
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
   * @throws InvalidArgumentError On wrong type or invalid URL format.
   *
   * @static
   */
  static checkUrl(url) {
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

    /**
     * Check URL string.
     *
     * @throws NoArgumentError      On missing URL.
     * @throws InvalidArgumentError On wrong type or invalid URL format.
     */
    this.checkString(url, 'URL');

    // Check URL format.
    if (check.not.match(url, formatRegex)) {
      throw new InvalidArgumentError(`URL ${messages.IS_INVALID}`);
    }
  }

  /**
   * Checks a number argument for existence and type.
   *
   * @param  {number} number Number provided.
   *
   * @throws NoArgumentError      On missing argument.
   * @throws InvalidArgumentError On wrong type.
   *
   * @static
   */
  static checkNumber(number, type) {
    /**
     * Check entity type for error message.
     * @throws InvalidArgumentError On wrong type.
     */
    this._checkTypeArgument(type);

    /**
     * Assign number entity name.
     * @type  {string} type Entity type.
     */
    const numberEntity = check.assigned(type) ? type : 'Number';

    // Check existence.
    if (check.not.assigned(number)) {
      throw new NoArgumentError(`${numberEntity} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.number(number)) {
      throw new InvalidArgumentError(`${numberEntity} ${messages.IS_NOT_NUMBER}`);
    }
  }

  /**
   * Checks a string argument for existence and type.
   *
   * @param  {string} string String provided.
   *
   * @throws NoArgumentError      On missing argument.
   * @throws InvalidArgumentError On wrong type.
   *
   * @static
   */
  static checkString(string, type) {
    /**
     * Check entity type for error message.
     * @throws InvalidArgumentError On wrong type.
     */
    this._checkTypeArgument(type);

    /**
     * Assign string entity name.
     * @type {string} type Entity type.
     */
    const stringEntity = check.assigned(type) ? type : 'String';

    // Check existence.
    if (check.not.assigned(string)) {
      throw new NoArgumentError(`${stringEntity} ${messages.IS_MISSING}`);
    }

    // Check type.
    if (check.not.string(string)) {
      throw new InvalidArgumentError(`${stringEntity} ${messages.IS_NOT_STRING}`);
    }
  }

  /**
   * Checks an integer argument for existence and type.
   *
   * @param  {integer} string Integer provided.
   *
   * @throws NoArgumentError      On missing argument.
   * @throws InvalidArgumentError On wrong type.
   *
   * @static
   */
  static checkInteger(integer, type) {
    /**
     * Check entity type for error message.
     * @throws InvalidArgumentError On wrong type.
     */
    this._checkTypeArgument(type);

    /**
     * Assign integer entity name.
     * @type {string} type Entity type.
     */
    const integerEntity = check.assigned(type) ? type : 'Integer';

    /**
     * Check numeric value.
     *
     * @throws NoArgumentError      On missing argument.
     * @throws InvalidArgumentError On wrong type.
     */
    this.checkNumber(integer, type);

    // Check integer type.
    if (check.not.integer(integer)) {
      throw new InvalidArgumentError(`${integerEntity} ${messages.IS_NOT_INTEGER}`);
    }
  }
}

module.exports = Validator;
