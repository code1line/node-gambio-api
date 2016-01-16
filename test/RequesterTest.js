const expect = require('chai').expect;
const extend = require('extend');
const Promise = require('bluebird');
const Requester = require('../lib/Requester');
const demoCredentials = require('../demo/credentials');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const AuthenticationError = require('../lib/error/AuthenticationError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const RequestError = require('../lib/error/RequestError');
const ResourceNotFoundError = require('../lib/error/ResourceNotFoundError');

// Test credentials.
const credentials = extend(true, {}, demoCredentials, { url: `${demoCredentials.url}/api.php/v2` });

describe('Requester', () => {
  describe('#constructor', () => {
    it('should work when valid parameters has been passed', () => {
      const func = () => new Requester(credentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing arguments', () => {
      const func = () => new Requester();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw NoArgumentError on missing password', () => {
      const crx = {
        url: credentials.url,
        user: credentials.user,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of password', () => {
      const crx = {
        url: credentials.url,
        user: credentials.user,
        pass: 123,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing user', () => {
      const crx = {
        url: credentials.url,
        pass: credentials.pass,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of user', () => {
      const crx = {
        url: credentials.url,
        user: 123,
        pass: credentials.pass,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const crx = {
        user: credentials.user,
        pass: credentials.pass,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of URL', () => {
      const crx = {
        user: credentials.user,
        pass: credentials.pass,
        url: 22,
      };
      const func = () => new Requester(crx);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#get', () => {
    it('should return a promise', () => {
      const request = new Requester(credentials);
      const get = request.get();
      expect(get).to.be.an.instanceOf(Promise);
    });

    it('should return rejected promise with AuthenticationError on invalid credentials', (done) => {
      const crx = extend(true, {}, credentials, { user: '', pass: '' });
      const request = new Requester(crx);
      const get = request.get();

      get.catch((error) => {
        expect(error).to.be.instanceOf(AuthenticationError);
        done();
      });
    });

    it('should return rejected promise with RequestError while performing request', (done) => {
      const crx = extend(true, {}, credentials, { url: 'http://127.0.0.2' });
      const request = new Requester(crx);
      const get = request.get();

      get
        .catch((error) => {
          expect(error).to.be.instanceOf(RequestError);
          done();
        });
    });

    it('should return rejected promise with ResourceNotFoundError on 404 status code', (done) => {
      const crx = extend(true, {}, credentials, { url: `${credentials.url}/asiudgasoidzo78324` });
      const request = new Requester(crx);
      const get = request.get();

      get
        .catch((error) => {
          expect(error).to.be.instanceOf(ResourceNotFoundError);
          done();
        });
    });

    it('should return parsed object on successful request with custom headers', (done) => {
      const request = new Requester(credentials);
      const headers = { 'Content-Type': 'application/json' };
      const get = request.get(headers);

      get.then((response) => {
        expect(response).to.be.a('object');
        done();
      });
    });
  });
});
