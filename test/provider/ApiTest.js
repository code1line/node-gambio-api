const expect = require('chai').expect;
const errors = require('common-errors');

const Api = require('./../../lib/api/Api');
const credentials = require('./../_credentials');

const testUrl = credentials.url;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};

describe('Api', () => {
  describe('#constructor', () => {
    it('should work when valid arguments have been provided', () => {
      const sandbox = () => new Api(testUrl, testAuth);
      expect(sandbox).not.to.throw(Error);
    });

    it('should throw ArgumentNullError on missing arguments', () => {
      const sandbox = () => new Api();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentNullError on missing URL argument', () => {
      const sandbox = () => new Api(null, testAuth);
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid URL argument', () => {
      const sandbox = () => new Api(2323, testAuth);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentNullError on missing authentication argument', () => {
      const sandbox = () => new Api(testUrl);
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid authentication argument', () => {
      const sandbox = () => new Api(testUrl, 2);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentNullError on missing authentication user argument', () => {
      const sandbox = () => new Api(testUrl, { pass: credentials.pass });
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid authentication user argument', () => {
      const sandbox = () => new Api(testUrl, { user: 23, pass: credentials.pass });
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentNullError on missing authentication password argument', () => {
      const sandbox = () => new Api(testUrl, { user: credentials.user });
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid authentication password argument', () => {
      const sandbox = () => new Api(testUrl, { user: credentials.user, pass: 232 });
      expect(sandbox).to.throw(errors.ArgumentError);
    });
  });
});
