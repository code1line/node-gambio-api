const expect = require('chai').expect;
const errors = require('common-errors');

const Validator = require('./../lib/Validator');

const validTestObject = { a: 1 };
const validTestUrl = 'http://www.google.com';
const validTestNumber = 46;

describe('Validator', () => {
  describe('#checkObject', () => {
    it('should throw no error on valid object', () => {
      const func = () => Validator.checkObject(validTestObject);
      expect(func).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing object', () => {
      const func = () => Validator.checkObject();
      expect(func).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const func = () => Validator.checkObject(22);
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError with entity name provided', () => {
      const entityName = 'Credentials';

      try {
        Validator.checkObject(3.2, entityName);
      } catch (error) {
        expect(error.message).to.contain(entityName);
      }
    });
  });

  describe('#checkUrl', () => {
    it('should throw no error on valid URL', () => {
      const func = () => Validator.checkUrl(validTestUrl);
      expect(func).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing URL', () => {
      const func = () => Validator.checkUrl();
      expect(func).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on bad formatted URL', () => {
      const func = () => Validator.checkUrl('u9712ez8o721ge');
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const func = () => Validator.checkUrl(22);
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError with entity name provided', () => {
      const entityName = 'Foo';

      try {
        Validator.checkUrl(3.2, entityName);
      } catch (error) {
        expect(error.message).to.contain(entityName);
      }
    });
  });

  describe('#checkNumber', () => {
    it('should throw no error on valid number', () => {
      const func = () => Validator.checkNumber(validTestNumber);
      expect(func).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing number', () => {
      const func = () => Validator.checkNumber();
      expect(func).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const func = () => Validator.checkNumber('22');
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError with entity name provided', () => {
      const entityName = 'Blubb';

      try {
        Validator.checkNumber('22', entityName);
      } catch (error) {
        expect(error.message).to.contain(entityName);
      }
    });
  });

  describe('#checkString', () => {
    it('should throw no error on valid string', () => {
      const func = () => Validator.checkString('2');
      expect(func).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing string', () => {
      const func = () => Validator.checkString();
      expect(func).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const func = () => Validator.checkString(22);
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError with entity name provided', () => {
      const entityName = 'Celsius';

      try {
        Validator.checkString(3.2, entityName);
      } catch (error) {
        expect(error.message).to.contain(entityName);
      }
    });
  });

  describe('#checkInteger', () => {
    it('should throw no error on valid integer', () => {
      const func = () => Validator.checkInteger(2);
      expect(func).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing integer', () => {
      const func = () => Validator.checkInteger();
      expect(func).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const func = () => Validator.checkInteger('22');
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError on float values', () => {
      const func = () => Validator.checkInteger(3.2);
      expect(func).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError with entity name provided', () => {
      const entityName = 'Zone ID';

      try {
        Validator.checkInteger(3.2, entityName);
      } catch (error) {
        expect(error.message).to.contain(entityName);
      }
    });
  });
});
