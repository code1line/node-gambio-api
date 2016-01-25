const expect = require('chai').expect;

const Api = require('../lib/api/Api');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');

const demoCredentials = require('../demo/credentials');

describe('Api', () => {
  describe('#constructor', () => {
    it('should work when valid parameter has been passed', () => {
      const func = () => new Api(demoCredentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing argument', () => {
      const func = () => new Api();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on invalid argument', () => {
      const func = () => new Api(2);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing password', () => {
      const credentials = {
        url: demoCredentials.url,
        user: demoCredentials.user,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of password', () => {
      const credentials = {
        url: demoCredentials.url,
        user: demoCredentials.user,
        pass: 2,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing user', () => {
      const credentials = {
        url: demoCredentials.url,
        pass: demoCredentials.pass,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of user', () => {
      const credentials = {
        url: demoCredentials.url,
        pass: demoCredentials.pass,
        user: 3,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const credentials = {
        pass: demoCredentials.pass,
        user: demoCredentials.user,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of URL', () => {
      const credentials = {
        url: 3,
        pass: demoCredentials.pass,
        user: demoCredentials.user,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on bad formatted URL', () => {
      const credentials = {
        url: '239848z329842398',
        pass: demoCredentials.pass,
        user: demoCredentials.user,
      };
      const func = () => new Api(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });
  });
});
