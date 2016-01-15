const expect = require('chai').expect;
const Promise = require('bluebird');

const Requester = require('../lib/Requester');
const demoCredentials = require('../demo/credentials');

// Test credentials.
const testUrl = `${demoCredentials.url}/api.php/v2`;
const testAuth = {
  user: demoCredentials.user,
  pass: demoCredentials.pass,
};

describe('Requester', () => {
  describe('#constructor', () => {
    it('should work when valid parameters has been passed', () => {
      const func = () => new Requester(testUrl, testAuth);
      expect(func).not.to.throw(Error);
    });

    it('should throw error on missing parameter', () => {
      const func = () => new Requester();
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of URL', () => {
      const func = () => new Requester(7, testAuth);
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of authentication', () => {
      const func = () => new Requester(testUrl, 77);
      expect(func).to.throw(Error);
    });
  });

  describe('#get', () => {
    it('should return a promise', () => {
      const request = new Requester(testUrl, testAuth);
      const get = request.get();
      expect(get).to.be.an.instanceOf(Promise);
    });

    it('should return response status code 401 on invalid credentials', (done) => {
      const request = new Requester(testUrl, { user: '', pass: '' });
      const get = request.get();

      get.then((response) => {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

    it('should return parsable response JSON body', (done) => {
      const request = new Requester(testUrl, testAuth);
      const get = request.get();

      get.then((response) => {
        expect(JSON.parse(response.body)).to.be.a('object');
        done();
      });
    });
  });
});
