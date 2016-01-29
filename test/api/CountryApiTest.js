const expect = require('chai').expect;

const Promise = require('bluebird');
const errors = require('common-errors');

const Api = require('./../../lib/api/Api');
const CountryApi = require('./../../lib/api/CountryApi');

const credentials = require('./../_credentials');

const testUrl = credentials.url + `/${credentials.apiSuffix}`;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};
const testInstance = new CountryApi(testUrl, testAuth);

describe('CountryApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new CountryApi(testUrl, testAuth);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should work if all arguments has been passed', () => {
      const sandbox = () => new CountryApi(testUrl, testAuth);
      expect(sandbox).not.to.throw(Error);
    });
  });

  describe('#getById', () => {
    it('should throw ArgumentNullError if argument is missing', () => {
      const sandbox = () => testInstance.getById();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an integer', () => {
      const sandbox = () => testInstance.getById(2.5);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.getById(81);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      const id = 81;
      testInstance
        .getById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.equal(id);
          done();
        });
    });

    it('should return rejected promise with Error on not found entries', (done) => {
      const id = 819999;

      testInstance
        .getById(id)
        .catch((error) => {
          expect(error).to.be.instanceOf(Error);
          done();
        });
    });
  });

  describe('#getZonesByCountryId', () => {
    it('should throw ArgumentNullError on missing argument', () => {
      const sandbox = () => testInstance.getZonesByCountryId();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an integer', () => {
      const sandbox = () => testInstance.getZonesByCountryId(2.5);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.getZonesByCountryId(81);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      testInstance
        .getZonesByCountryId(81)
        .then((response) => {
          expect(response).to.be.a('array');
          done();
        });
    });

    it('should return resolved promise with empty array on not found resources', (done) => {
      testInstance
        .getZonesByCountryId(819999)
        .then((response) => {
          expect(response).to.be.a('array');
          expect(response).to.have.length(0);
          done();
        });
    });
  });
});
