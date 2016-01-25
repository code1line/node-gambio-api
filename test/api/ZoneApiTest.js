const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');

const Api = require('../lib/api/Api');
const ZoneApi = require('../lib/api/ZoneApi');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const ServerError = require('../lib/error/ServerError');

const demoCredentials = require('../demo/credentials');

// Test credentials.
const credentials = extend(
  true,
  {},
  demoCredentials,
  { url: `${demoCredentials.url}/api.php/v2` }
);

describe('ZoneApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new ZoneApi(credentials);
      expect(instance).to.be.instanceOf(Api);
    });
  });

  describe('#getById', () => {
    it('should correctly if all arguments has been passed', () => {
      const func = () => new ZoneApi(credentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new ZoneApi(credentials);
        instance.getById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new ZoneApi(credentials);
        instance.getById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new ZoneApi(credentials);
        instance.getById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new ZoneApi(credentials);
      const request = instance.getById(81);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 46;
      const instance = new ZoneApi(credentials);
      instance
        .getById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.equal(id);
          done();
        });
    });

    it('should return rejected promise with ServerError', (done) => {
      const id = 819999;
      const instance = new ZoneApi(credentials);
      instance
        .getById(id)
        .catch((error) => {
          expect(error).to.be.instanceOf(ServerError);
          done();
        });
    });
  });
});
