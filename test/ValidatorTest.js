const expect = require('chai').expect;

const Validator = require('../lib/Validator');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const demoCredentials = require('../demo/credentials');
const messages = require('../lib/messageContainer');

describe('Validator', () => {
  describe('#constructor', () => {
    it('should be already instantiated on require', () => {
      expect(Validator).to.be.a('object');
    });
  });

  describe('#checkObjectParameter', () => {
    it('should throw no error on valid object', () => {
      const func = () => Validator.checkObjectParameter(demoCredentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing object', () => {
      const func = () => Validator.checkObjectParameter();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkObjectParameter(22);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError with entity name provided', () => {
      const entityName = 'Credentials';
      const expectedMessage = `${entityName} ${messages.IS_NOT_OBJECT}`;

      try {
        Validator.checkObjectParameter(3.2, entityName);
      } catch (error) {
        expect(error.message).to.equal(expectedMessage);
      }
    });
  });

  describe('#checkUrl', () => {
    it('should throw no error on valid URL', () => {
      const func = () => Validator.checkUrl(demoCredentials.url);
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

  describe('#checkUser', () => {
    it('should throw no error on valid user', () => {
      const func = () => Validator.checkUser(demoCredentials.user);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing user', () => {
      const func = () => Validator.checkUser();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkUser(22);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#checkPassword', () => {
    it('should throw no error on valid password', () => {
      const func = () => Validator.checkPassword(demoCredentials.pass);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing password', () => {
      const func = () => Validator.checkPassword();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkPassword(22);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#checkId', () => {
    it('should throw no error on valid ID', () => {
      const func = () => Validator.checkId(2);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing ID', () => {
      const func = () => Validator.checkId();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkId('22');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on float values', () => {
      const func = () => Validator.checkId(3.2);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError with entity name provided', () => {
      const entityName = 'Zone ID';
      const expectedMessage = `${entityName} ${messages.IS_NOT_INTEGER}`;

      try {
        Validator.checkId(3.2, entityName);
      } catch (error) {
        expect(error.message).to.equal(expectedMessage);
      }
    });
  });

  describe('#checkVersion', () => {
    it('should throw no error on valid version', () => {
      const func = () => Validator.checkVersion('v2');
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing version', () => {
      const func = () => Validator.checkVersion();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => Validator.checkVersion(22);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on bad formatted version', () => {
      const func = () => Validator.checkVersion('2.353');
      expect(func).to.throw(InvalidArgumentError);
    });
  });
});
