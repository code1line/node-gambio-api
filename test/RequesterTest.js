const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');
const errors = require('common-errors');

const Requester = require('./../lib/Requester');
const credentials = require('./_credentials');

const testUrl = `${credentials.url}/${credentials.apiSuffix}/customers`;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};
const testData = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: `gambio.js.api@test.com`,
  password: '0123456789',
  type: 'registree',
  address: {
    company: 'Test Company',
    street: 'Test Street',
    suburb: 'Test Suburb',
    postcode: '23983',
    city: 'Test City',
    countryId: 81,
    zoneId: 84,
    b2bStatus: true,
  },
};

/**
 * Generate a new random E-Mail address and put it to the test data object.
 */
function generateNewEmailAddress() {
  const email = `gambio.js.api.${Math.random() * (100000 - 100) + 100}@test.com`;
  extend(true, testData, { email });
}

/**
 * Helper function to test `url` and `auth` arguments and promise instance.
 *
 * @param  {String} testedMethodName    Name of tested method.
 * @param  {*}      additionalParameter Addtional parameter.
 * @param  {String} url                 URL string.
 */
function argumentsAndPromiseTest(testedMethodName, additionalParameter, url) {
  url = url || testUrl;

  it('should throw ArgumentNullError if no arguments are passed', () => {
    const sandbox = () => Requester[testedMethodName].apply(Requester);
    expect(sandbox).to.throw(errors.ArgumentNullError);
  });

  it('should throw ArgumenNullError if no URL is passed', () => {
    const parameters = [null, testAuth, additionalParameter];
    const sandbox = () => Requester[testedMethodName].apply(Requester, parameters);
    expect(sandbox).to.throw(errors.ArgumentNullError);
  });

  it('should throw ArgumentNullError if no authentication object is passed', () => {
    const parameters = [url, null, additionalParameter];
    const sandbox = () => Requester[testedMethodName].apply(Requester, parameters);
    expect(sandbox).to.throw(errors.ArgumentNullError);
  });

  it('should return a Promise', () => {
    const parameters = [url, testAuth, additionalParameter];
    const request = Requester[testedMethodName].apply(Requester, parameters);
    expect(request).to.be.an.instanceOf(Promise);
  });
}

describe('Requester', () => {
  beforeEach(() => generateNewEmailAddress());

  describe('Errors', () => {
    it('should return rejected promise on invalid credentials', (done) => {
      const myAuth = extend({}, testAuth, { user: 'blubb', pass: 'blubb' });
      const request = Requester.get(testUrl, myAuth);

      request.catch((error) => {
        expect(error).to.be.instanceOf(errors.AuthenticationRequiredError);
        expect(error.data.code).to.equal(401);
        done();
      });
    });

    it('should return rejected promise on not found resource', (done) => {
      const myUrl = `${testUrl}/99999999`;
      const request = Requester.get(myUrl, testAuth);

      request.catch((error) => {
        expect(error).to.be.instanceOf(errors.NotFoundError);
        expect(error.data.code).to.equal(404);
        done();
      });
    });
  });

  describe('#get', () => {
    argumentsAndPromiseTest('get');

    it('should work', (done) => {
      const request = Requester.get(testUrl, testAuth);

      request.then((response) => {
        expect(response).to.be.a('array');
        done();
      });
    });
  });

  describe('#post', () => {
    argumentsAndPromiseTest('post', testData);

    it('should work', (done) => {
      const request = Requester.post(testUrl, testAuth, testData);

      request.then((response) => {
        expect(response).to.be.a('object');
        expect(response.firstname).to.equal(testData.firstname);
        done();
      });
    });
  });

  describe('#delete', () => {
    argumentsAndPromiseTest('delete', null, `${testUrl}/999999`);

    it('should work', (done) => {
      Requester.post(testUrl, testAuth, testData)
        .then((response) => {
          const requestUrl = `${testUrl}/${response.id}`;
          return Requester.delete(requestUrl, testAuth);
        })
        .then((response) => {
          expect(response.code).to.equal(200);
          expect(response.status).to.equal('success');
          done();
        });
    });
  });

  describe('#put', () => {
    const myData = { firstname: 'Franc' };

    argumentsAndPromiseTest('put', myData, `${testUrl}/2`);

    it('should work', (done) => {
      Requester.post(testUrl, testAuth, testData)
        .then((response) => {
          const requestUrl = `${testUrl}/${response.id}`;
          return Requester.put(requestUrl, testAuth, myData);
        })
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.firstname).to.equal(myData.firstname);
          done();
        });
    });
  });
});
