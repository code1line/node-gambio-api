const expect = require('chai').expect;
const Promise = require('bluebird');
const Api = require('../lib/api/Api');
const CountryApi = require('../lib/api/CountryApi');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const RequestError = require('../lib/error/RequestError');
const demoCredentials = require('../demo/credentials');

// Test credentials.
const testUrl = `${demoCredentials.url}/api.php/v2`;
const testUser = demoCredentials.user;
const testPassword = demoCredentials.pass;

describe('CountryApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new CountryApi(testUrl, testUser, testPassword);
      expect(instance).to.be.instanceOf(Api);
    });
  });

  describe('#getById', () => {
    it('should correctly if all arguments has been passed', () => {
      const func = () => new CountryApi(testUrl, testUser, testPassword);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new CountryApi(testUrl, testUser, testPassword);
        instance.getById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new CountryApi(testUrl, testUser, testPassword);
        instance.getById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new CountryApi(testUrl, testUser, testPassword);
        instance.getById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new CountryApi(testUrl, testUser, testPassword);
      const request = instance.getById(81);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 81;
      const instance = new CountryApi(testUrl, testUser, testPassword);
      instance
        .getById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.equal(id);
          done();
        });
    });

    it('should return rejected promise with RequestError', (done) => {
      const id = 819999;
      const instance = new CountryApi(testUrl, testUser, testPassword);
      instance
        .getById(id)
        .catch((error) => {
          expect(error).to.be.instanceOf(RequestError);
          done();
        });
    });
  });
});
