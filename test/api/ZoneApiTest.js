const expect = require('chai').expect;

const errors = require('common-errors');
const Promise = require('bluebird');

const Api = require('./../../lib/api/Api');
const ZoneApi = require('./../../lib/api/ZoneApi');
const credentials = require('./../_credentials');

const testUrl = credentials.url + `/${credentials.apiSuffix}`;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};
const testInstance = new ZoneApi(testUrl, testAuth);

describe('ZoneApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new ZoneApi(credentials);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should work if all arguments has been passed', () => {
      const sandbox = () => new ZoneApi(testUrl, testAuth);
      expect(sandbox).not.to.throw(Error);
    });
  });

  describe('#getById', () => {
    it('should throw ArgumentNullError on missing argument', () => {
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
      const id = 46;
      testInstance
        .getById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.equal(id);
          done();
        });
    });

    it('should return rejected promise with NotFoundError on not found entry', (done) => {
      testInstance
        .getById(819999)
        .catch((error) => {
          expect(error).to.be.instanceOf(errors.NotFoundError);
          done();
        });
    });
  });
});
