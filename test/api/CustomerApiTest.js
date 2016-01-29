const expect = require('chai').expect;

const extend = require('extend');
const errors = require('common-errors');
const Promise = require('bluebird');

const Api = require('./../../lib/api/Api');
const CustomerApi = require('./../../lib/api/CustomerApi');
const manipulatorTest = require('./../_manipulatorTestHelper');
const credentials = require('./../_credentials');

const testUrl = credentials.url + `/${credentials.apiSuffix}`;
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
  email: 'test@mail.com',
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
const testInstance = new CustomerApi(testUrl, testAuth);

function generateNewEmailAddress() {
  const email = `gambio.js.api.${Math.random() * (100000 - 100) + 100}@test.com`;
  extend(true, testData, { email });
}

describe('CustomerApi', () => {
  beforeEach(() => generateNewEmailAddress());

  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new CustomerApi(testUrl, testAuth);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should work if all arguments has been passed', () => {
      const sandbox = () => new CustomerApi(testUrl, testAuth);
      expect(sandbox).not.to.throw(Error);
    });
  });

  describe('#get', () => {
    manipulatorTest({
      testedObject: testInstance,
      methodName: 'get',
      limitedFields: ['firstname'],
      excludedField: 'lastname',
    });

    it('should return a instance of Promise', () => {
      const request = testInstance.get();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.get()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#search', () => {
    it('should throw ArgumentNullError on missing argument', () => {
      const sandbox = () => testInstance.search();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid type of argument', () => {
      const sandbox = () => testInstance.search(2123);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return an instance of Promise', () => {
      const request = testInstance.search('test');
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.search('test')
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getGuests', () => {
    manipulatorTest({
      testedObject: testInstance,
      methodName: 'getGuests',
      limitedFields: ['firstname'],
      excludedField: 'lastname',
    });

    it('should return a instance of Promise', () => {
      const request = testInstance.getGuests();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.getGuests()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getAddressesByCustomerId', () => {
    it('should throw ArgumentNullError on missing argument', () => {
      const sandbox = () => testInstance.getAddressesByCustomerId();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError on invalid argument', () => {
      const sandbox = () => testInstance.getAddressesByCustomerId('123');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return an instance of Promise', () => {
      const request = testInstance.getAddressesByCustomerId(28);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.getAddressesByCustomerId(28)
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
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
      const request = testInstance.getById(10);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      const id = 28;
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

  describe('#create', () => {
    it('should throw ArgumentNullError on missing arguments', () => {
      const sandbox = () => testInstance.create();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an object', () => {
      const sandbox = () => testInstance.create('asdsadasd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.create(testData);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should create a new customer', (done) => {
      testInstance
        .create(testData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.firstname).to.equal(testData.firstname);
          done();
        });
    });
  });

  describe('#deleteById', () => {
    it('should throw ArgumentNullError on missing argument', () => {
      const sandbox = () => testInstance.deleteById();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an integer', () => {
      const sandbox = () => testInstance.deleteById(2.5);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.deleteById(32);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      testInstance
        .deleteById(32)
        .then((response) => {
          expect(response).to.be.a('object');
          done();
        });
    });
  });

  describe('#updateById', () => {
    it('should throw ArgumentNullError on missing ID argument', () => {
      const sandbox = () => testInstance.updateById();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if ID argument is not number', () => {
      const sandbox = () => testInstance.updateById('asdsadasd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentNullError on missing data argument', () => {
      const sandbox = () => testInstance.updateById(1);
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if data argument is not an object', () => {
      const sandbox = () => testInstance.updateById(2, 'sdsd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.updateById(2, { firstname: 'Franc' });
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should update an customer', (done) => {
      const myData = { firstname: 'Franc' };
      testInstance
        .updateById(2, myData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.firstname).to.equal(myData.firstname);
          done();
        });
    });
  });
});
