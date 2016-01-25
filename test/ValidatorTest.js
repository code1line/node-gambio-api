const expect = require('chai').expect;

const Validator = require('./../lib/Validator');
const messages = require('./../lib/provider/messages');
const InvalidArgumentError = require('./../lib/error/InvalidArgumentError');
const NoArgumentError = require('./../lib/error/NoArgumentError');

const validTestObject = { a: 1 };
const validTestUrl = 'http://www.google.com';
const validTestNumber = 46;

describe('Validator', () => {
  describe('#checkObject', () => {
    it('should throw no error on valid object', () => {
      const func = () => Validator.checkObject(validTestObject);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing object', () => {
      const func = () => Validator.checkObject();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkObject(22);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError with entity name provided', () => {
      const entityName = 'Credentials';
      const expectedMessage = `${entityName} ${messages.IS_NOT_OBJECT}`;

      try {
        Validator.checkObject(3.2, entityName);
      } catch (error) {
        expect(error.message).to.equal(expectedMessage);
      }
    });
  });

  describe('#checkUrl', () => {
    it('should throw no error on valid URL', () => {
      const func = () => Validator.checkUrl(validTestUrl);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const func = () => Validator.checkUrl();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on bad formatted URL', () => {
      const func = () => Validator.checkUrl('u9712ez8o721ge');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkUrl(22);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#checkNumber', () => {
    it('should throw no error on valid number', () => {
      const func = () => Validator.checkNumber(validTestNumber);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing number', () => {
      const func = () => Validator.checkNumber();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkNumber('22');
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#checkString', () => {
    it('should throw no error on valid string', () => {
      const func = () => Validator.checkString('2');
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing string', () => {
      const func = () => Validator.checkString();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkString(22);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError with entity name provided', () => {
      const entityName = 'Celsius';
      const expectedMessage = `${entityName} ${messages.IS_NOT_STRING}`;

      try {
        Validator.checkString(3.2, entityName);
      } catch (error) {
        expect(error.message).to.equal(expectedMessage);
      }
    });
  });

  describe('#checkInteger', () => {
    it('should throw no error on valid integer', () => {
      const func = () => Validator.checkInteger(2);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing integer', () => {
      const func = () => Validator.checkInteger();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkInteger('22');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on float values', () => {
      const func = () => Validator.checkInteger(3.2);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError with entity name provided', () => {
      const entityName = 'Zone ID';
      const expectedMessage = `${entityName} ${messages.IS_NOT_INTEGER}`;

      try {
        Validator.checkInteger(3.2, entityName);
      } catch (error) {
        expect(error.message).to.equal(expectedMessage);
      }
    });
  });
});
