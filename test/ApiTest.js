const expect = require('chai').expect;

const Api = require('../lib/api/Api');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');

// Suffix reference.
const suffix = '/';

describe('Api', () => {
  describe('#constructor', () => {
    it('should throw NoArgumentError on instantiating without URL parameter', () => {
      const func = () => new Api();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on instantiating with invalid URL', () => {
      const func = () => new Api('');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError on instantiating with invalid type', () => {
      const func = () => new Api(222);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should work on instantiating with valid credentials', () => {
      const func = () => new Api('http://google.com');
      expect(func).not.to.throw(Error);
    });
  });

  describe('#getApiUrl', () => {
    it('should return a string', () => {
      const api = new Api('http://google.com');
      const apiUrl = api.getApiUrl();
      expect(apiUrl).to.be.a('string');
    });

    it('should return the provided URL with endpoint suffix', () => {
      const rootUrl = 'http://google.com';
      const api = new Api(rootUrl);
      const apiUrl = api.getApiUrl();
      expect(apiUrl).to.equal(rootUrl + suffix);
    });
  });
});
