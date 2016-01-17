const expect = require('chai').expect;

const extend = require('extend');

const GambioApi = require('../.');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');

const demoCredentials = require('../demo/credentials');

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

  describe('#countries', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.countries.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.countries.getById(80)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#getZonesByCountryId', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.countries.getZonesByCountryId).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.countries.getZonesByCountryId(80)
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });
  });

  describe('#zones', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.zones.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.zones.getById(80)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#addresses', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.getById(10)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#create', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.create).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.create({})
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.deleteById(9999)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#updateById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.updateById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.updateById(9998, { company: 'test' })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });
});
