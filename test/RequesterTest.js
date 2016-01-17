const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');

const Requester = require('../lib/Requester');
const demoCredentials = require('../demo/credentials');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const RequestError = require('../lib/error/RequestError');
const ClientError = require('../lib/error/ClientError');

// Test credentials.
const credentials = extend(true, {}, demoCredentials,
  { url: `${demoCredentials.url}/api.php/v2/customers` }
);

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
      const crx = extend(true, {}, credentials);
      delete crx.pass;

      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of password', () => {
      const crx = extend(true, {}, credentials, { pass: 123 });
      const func = () => new Requester(crx);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing user', () => {
      const crx = extend(true, {}, credentials);
      delete crx.user;

      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of user', () => {
      const crx = extend(true, {}, credentials, { user: 123 });
      const func = () => new Requester(crx);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError on missing URL', () => {
      const crx = extend(true, {}, credentials);
      delete crx.url;

      const func = () => new Requester(crx);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong type of URL', () => {
      const crx = extend(true, {}, credentials, { url: 123 });
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

    it('should return rejected promise with ClientError 401 on invalid credentials', (done) => {
      const crx = extend(true, {}, credentials, { user: 'blubb', pass: 'blubb' });
      const request = new Requester(crx);
      const get = request.get();

      get.catch((error) => {
        expect(error).to.be.instanceOf(ClientError);
        expect(error.code).to.equal(401);
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

    it('should return rejected promise with ClientError 404 on not found resource', (done) => {
      const crx = extend(true, {}, credentials,
        { url: `${credentials.url}/99999999` }
      );
      const request = new Requester(crx);
      const get = request.get();

      get
        .catch((error) => {
          expect(error).to.be.instanceOf(ClientError);
          expect(error.code).to.equal(404);
          done();
        });
    });

    it('should return resolved promise on successful request with custom headers', (done) => {
      const request = new Requester(credentials);
      const headers = { 'User-Agent': 'Tester' };
      const get = request.get(headers);

      get.then((response) => {
        expect(response).to.be.a('array');
        done();
      });
    });
  });

  describe('#post', () => {
    it('should return a promise', () => {
      const crx = extend(true, {}, credentials,
        { url: `${demoCredentials.url}/api.php/v2/addresses` }
      );
      const request = new Requester(crx);
      const post = request.post();
      expect(post).to.be.an.instanceOf(Promise);
    });

    it('should return rejected promise with ClientError 401 on invalid credentials', (done) => {
      const crx = extend(true, {}, credentials, { user: 'blubb', pass: 'blubb' });
      const request = new Requester(crx);
      const post = request.post();

      post.catch((error) => {
        expect(error).to.be.instanceOf(ClientError);
        expect(error.code).to.equal(401);
        done();
      });
    });

    it('should return rejected promise with RequestError while performing request', (done) => {
      const crx = extend(true, {}, credentials, { url: 'http://127.0.0.2/tztz' });
      const request = new Requester(crx);
      const post = request.post();

      post
        .catch((error) => {
          expect(error).to.be.instanceOf(RequestError);
          done();
        });
    });

    it('should return rejected promise with ClientError 404 on not found status code', (done) => {
      const crx = extend(true, {}, credentials,
        { url: `${demoCredentials.url}/api.php/v2/abcde` }
      );
      const request = new Requester(crx);
      const post = request.post();

      post
        .catch((error) => {
          expect(error).to.be.instanceOf(ClientError);
          expect(error.code).to.equal(404);
          done();
        });
    });

    it('should return resolved promise on successful request with custom data', (done) => {
      const crx = extend(true, {}, credentials,
        { url: `${demoCredentials.url}/api.php/v2/addresses` }
      );
      const request = new Requester(crx);
      const data = {
        customerId: 1,
        gender: 'm',
        company: 'Test Company',
        firstname: 'John',
        lastname: 'Doe',
        street: 'Test Street 1',
        suburb: 'Test Suburb',
        postcode: '23983',
        city: 'Test City',
        countryId: 81,
        zoneId: 84,
        class: null,
        b2bStatus: false,
      };
      const post = request.post(data);

      post.then((response) => {
        expect(response).to.be.a('object');
        done();
      });
    });
  });
});
