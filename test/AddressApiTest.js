const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');

const Api = require('../lib/api/Api');
const AddressApi = require('../lib/api/AddressApi');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const ClientError = require('../lib/error/ClientError');

const demoCredentials = require('../demo/credentials');

// Test credentials.
const credentials = extend(
  true,
  {},
  demoCredentials,
  { url: `${demoCredentials.url}/api.php/v2` }
);

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

describe('AddressApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new AddressApi(credentials);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should correctly if all arguments has been passed', () => {
      const func = () => new AddressApi(credentials);
      expect(func).not.to.throw(Error);
    });
  });

  describe('#getById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.getById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.getById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.getById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new AddressApi(credentials);
      const request = instance.getById(1);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 2;
      const instance = new AddressApi(credentials);
      instance
        .getById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.equal(id);
          done();
        });
    });

    it('should return rejected promise with ClientError on not found entry', (done) => {
      const id = 819999;
      const instance = new AddressApi(credentials);
      instance
        .getById(id)
        .catch((error) => {
          expect(error).to.be.instanceOf(ClientError);
          done();
        });
    });
  });

  describe('#create', () => {
    it('should throw NoArgumentError if no object has been passed', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.create();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an object', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.create('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new AddressApi(credentials);
      const request = instance.create(data);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should create a new address on valid data', (done) => {
      const instance = new AddressApi(credentials);
      instance
        .create(data)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          done();
        });
    });
  });

  describe('#deleteById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.deleteById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.deleteById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.deleteById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new AddressApi(credentials);
      const request = instance.deleteById(1);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 1;
      const instance = new AddressApi(credentials);
      instance
        .deleteById(id)
        .then((response) => {
          expect(response).to.be.a('object');
          done();
        });
    });
  });

  describe('#updateById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.updateById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if ID is not number', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.updateById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError if no data has been passed', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.updateById(1);
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if data is not an object', () => {
      const func = () => {
        const instance = new AddressApi(credentials);
        instance.updateById(2, 'sdsd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new AddressApi(credentials);
      const request = instance.updateById(89, data);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should update an address on providing valid data', (done) => {
      const instance = new AddressApi(credentials);
      instance
        .updateById(9, data)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          done();
        });
    });
  });
});
