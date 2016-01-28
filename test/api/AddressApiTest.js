const expect = require('chai').expect;

const Promise = require('bluebird');
const errors = require('common-errors');

const Api = require('./../../lib/api/Api');
const AddressApi = require('./../../lib/api/AddressApi');
const credentials = require('./../_credentials');

const testUrl = credentials.url + `/${credentials.apiSuffix}`;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};
const testData = {
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
const testInstance = new AddressApi(testUrl, testAuth);


describe('AddressApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new AddressApi(testUrl, testAuth);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should work if all arguments has been passed', () => {
      const sandbox = () => new AddressApi(testUrl, testAuth);
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
      const request = testInstance.getById(10);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      const id = 10;

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
        .getById(9999999999)
        .catch((error) => {
          expect(error).to.be.instanceOf(errors.NotFoundError);
          done();
        });
    });
  });

  describe('#create', () => {
    it('should throw ArgumentNullError if argument is missing', () => {
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

    it('should create a new address', (done) => {
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
    it('should throw ArgumentNullError if argument is missing', () => {
      const sandbox = () => testInstance.deleteById();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an integer', () => {
      const sandbox = () => testInstance.deleteById(2.5);
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.deleteById(99999);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should delete address and return a result', (done) => {
      const id = 99999;

      testInstance
        .deleteById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.addressId).to.equal(id);
          done();
        });
    });
  });

  describe('#updateById', () => {
    it('should throw ArgumentNullError if ID argument is missing', () => {
      const sandbox = () => testInstance.updateById();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if ID argument number', () => {
      const sandbox = () => testInstance.updateById('asdsadasd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentNullError if data argument is missing', () => {
      const sandbox = () => testInstance.updateById(1);
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if data argument is not an object', () => {
      const sandbox = () => testInstance.updateById(1, 'sdsd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      testInstance.create(testData)
        .then((result) => {
          const request = testInstance.updateById(result.id, { firstname: 'Franc' });
          expect(request).to.be.an.instanceOf(Promise);
        });
    });

    it('should update an address', (done) => {
      const myData = { firstname: 'Franc' };
      testInstance
        .create(testData)
        .then((result) => {
          return testInstance.updateById(result.id, myData);
        })
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.firstname).to.equal(myData.firstname);
          done();
        });
    });
  });
});
