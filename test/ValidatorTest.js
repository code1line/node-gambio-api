const expect = require('chai').expect;
const errors = require('common-errors');

const Validator = require('./../lib/Validator');

const testObject = { a: 1 };
const testUrl = 'http://www.google.com';
const testNumber = 46;

describe('Validator', () => {
  describe('#checkObject', () => {
    it('should throw no error on valid object', () => {
      const sandbox = () => Validator.checkObject(testObject);
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing object', () => {
      const sandbox = () => Validator.checkObject();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const sandbox = () => Validator.checkObject(22);
      expect(sandbox).to.throw(errors.ArgumentError);
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
      const sandbox = () => Validator.checkUrl(testUrl);
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing URL', () => {
      const sandbox = () => Validator.checkUrl();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on bad formatted URL', () => {
      const sandbox = () => Validator.checkUrl('u9712ez8o721ge');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const sandbox = () => Validator.checkUrl(22);
      expect(sandbox).to.throw(errors.ArgumentError);
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
      const sandbox = () => Validator.checkNumber(testNumber);
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing number', () => {
      const sandbox = () => Validator.checkNumber();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const sandbox = () => Validator.checkNumber('22');
      expect(sandbox).to.throw(errors.ArgumentError);
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
      const sandbox = () => Validator.checkString('2');
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing string', () => {
      const sandbox = () => Validator.checkString();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const sandbox = () => Validator.checkString(22);
      expect(sandbox).to.throw(errors.ArgumentError);
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
      const sandbox = () => Validator.checkInteger(2);
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing integer', () => {
      const sandbox = () => Validator.checkInteger();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on wrong argument type', () => {
      const sandbox = () => Validator.checkInteger('22');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError on float values', () => {
      const sandbox = () => Validator.checkInteger(3.2);
      expect(sandbox).to.throw(errors.ArgumentError);
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
