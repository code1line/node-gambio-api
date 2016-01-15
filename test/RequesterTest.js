const expect = require('chai').expect;
const Promise = require('bluebird');
const Requester = require('../lib/Requester');
const demoCredentials = require('../demo/credentials');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const AuthenticationError = require('../lib/error/AuthenticationError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const RequestError = require('../lib/error/RequestError');
const ResourceNotFoundError = require('../lib/error/ResourceNotFoundError');

// Test credentials.
const testUrl = `${demoCredentials.url}/api.php/v2`;
const testUser = demoCredentials.user;
const testPassword = demoCredentials.pass;

describe('Requester', () => {
  describe('#constructor', () => {
    it('should work when valid parameters has been passed', () => {
      const func = () => new Requester(testUrl, testUser, testPassword);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError on missing arguments', () => {
      const func = () => new Requester();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw NoArgumentError on missing password', () => {
      const func = () => new Requester(testUrl, testUser);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of password', () => {
      const func = () => new Requester(testUrl, testUser, 123123);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing user', () => {
      const func = () => new Requester(testUrl);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of user', () => {
      const func = () => new Requester(testUrl, 123123);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const func = () => new Requester();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of URL', () => {
      const func = () => new Requester(123123);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#get', () => {
    it('should return a promise', () => {
      const request = new Requester(testUrl, testUser, testPassword);
      const get = request.get();
      expect(get).to.be.an.instanceOf(Promise);
    });

    it('should return rejected promise with AuthenticationError on invalid credentials', (done) => {
      const request = new Requester(testUrl, '', '');
      const get = request.get();

      get.catch((error) => {
        expect(error).to.be.instanceOf(AuthenticationError);
        done();
      });
    });

    it('should return rejected promise with RequestError while performing request', (done) => {
      const url = 'http://127.0.0.2';
      const request = new Requester(url, '', '');
      const get = request.get();

      get
        .then(() => {
          done();
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(RequestError);
          done();
        });
    });

    it('should return rejected promise with ResourceNotFoundError on 404 status code', (done) => {
      const url = `${testUrl}/asiudgasoidzo78324`;
      const request = new Requester(url, '', '');
      const get = request.get();

      get
        .then(() => {
          done();
        })
        .catch((error) => {
          expect(error).to.be.instanceOf(ResourceNotFoundError);
          done();
        });
    });

    it('should return parsed object from JSON on successful request', (done) => {
      const request = new Requester(testUrl, testUser, testPassword);
      const get = request.get();

      get.then((response) => {
        expect(response).to.be.a('object');
        done();
      });
    });
  });
});
