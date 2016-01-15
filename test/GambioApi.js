const expect = require('chai').expect;
const extend = require('extend');

const GambioApi = require('../.');
const demoCredentials = require('../demo/credentials');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');

describe('GambioApi', () => {
  describe('#constructor', () => {
    it('should throw NoArgumentError on instantiating without credentials', () => {
      const func = () => new GambioApi();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on instantiating with invalid credentials', () => {
      const func = () => new GambioApi('s');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should work on instantiating with valid credentials', () => {
      const func = () => new GambioApi(demoCredentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw InvalidArgumentError on instantiating with invalid version type', () => {
      const credentials = extend(true, {}, demoCredentials, { version: 234 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing URL', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.url;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong URL type', () => {
      const credentials = extend(true, {}, demoCredentials, { url: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing user', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.user;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong user type', () => {
      const credentials = extend(true, {}, demoCredentials, { user: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing password', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.pass;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong password type', () => {
      const credentials = extend(true, {}, demoCredentials, { pass: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });
  });
});
