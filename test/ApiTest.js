const expect = require('chai').expect;

const Api = require('../lib/api/Api');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const demoCredentials = require('../demo/credentials');

// Test credentials.
const testUrl = `${demoCredentials.url}/api.php/v2`;
const testUser = demoCredentials.user;
const testPassword = demoCredentials.pass;

describe('Api', () => {
  describe('#constructor', () => {
    it('should work when valid parameters has been passed', () => {
      const func = () => new Api(testUrl, testUser, testPassword);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing arguments', () => {
      const func = () => new Api();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw NoArgumentError on missing password', () => {
      const func = () => new Api(testUrl, testUser);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of password', () => {
      const func = () => new Api(testUrl, testUser, 123123);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing user', () => {
      const func = () => new Api(testUrl);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of user', () => {
      const func = () => new Api(testUrl, 123123);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const func = () => new Api();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of URL', () => {
      const func = () => new Api(123123);
      expect(func).to.throw(InvalidArgumentError);
    });
  });
});
