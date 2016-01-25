const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');

const Api = require('../lib/api/Api');
const CustomerApi = require('../lib/api/CustomerApi');

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

const getRandomInteger = () => Math.random() * (100000 - 100) + 100;

const getRandomEmailAddress = () => `customer${getRandomInteger()}@email.de`;

// Test data.
const data = {
  gender: 'm',
  firstname: 'John',
  lastname: 'Doe',
  dateOfBirth: '1985-02-13',
  vatNumber: '0923429837942',
  telephone: '2343948798345',
  fax: '2093049283',
  email: getRandomEmailAddress(),
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

describe('CustomerApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new CustomerApi(credentials);
      expect(instance).to.be.instanceOf(Api);
    });
  });

  describe('#get', () => {
    it('should throw InvalidArgumentError on passing invalid optional argument', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.get(123);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a instance of Promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.get();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new CustomerApi(credentials);
      instance.get()
        .then((result) => {
          expect(result).to.have.length.above(1);
          expect(result).to.be.a('array');
          done();
        });
    });

    it('should return sorted result in resolved promise when criteria is passed', (done) => {
      const instance = new CustomerApi(credentials);
      instance.get({ id: 'desc' })
        .then((result) => {
          expect(result[0].id).to.be.above(result[1].id);
          done();
        });
    });
  });

  describe('#search', () => {
    it('should throw NoArgumentError on missing argument', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.search();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on invalid type of argument', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.search(2123);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a instance of Promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.search('test');
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new CustomerApi(credentials);
      instance.search('test')
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getGuests', () => {
    it('should return a instance of Promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.getGuests();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new CustomerApi(credentials);
      instance.getGuests()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getAddressesByCustomerId', () => {
    it('should throw NoArgumentError on missing argument', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.getAddressesByCustomerId();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on passing invalid argument', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.getAddressesByCustomerId('123');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a instance of Promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.getAddressesByCustomerId(28);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new CustomerApi(credentials);
      instance.getAddressesByCustomerId(28)
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.getById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.getById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.getById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.getById(10);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 28;
      const instance = new CustomerApi(credentials);
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
      const instance = new CustomerApi(credentials);
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
        const instance = new CustomerApi(credentials);
        instance.create();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an object', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.create('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.create(data);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should create a new customer on valid data', (done) => {
      const instance = new CustomerApi(credentials);
      const myData = extend(true, {}, data, { email: getRandomEmailAddress() });
      instance
        .create(myData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.firstname).to.equal(data.firstname);
          done();
        });
    });
  });

  describe('#deleteById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.deleteById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.deleteById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.deleteById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new CustomerApi(credentials);
      const request = instance.deleteById(32);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 32;
      const instance = new CustomerApi(credentials);
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
        const instance = new CustomerApi(credentials);
        instance.updateById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if ID is not number', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.updateById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgumentError if no data has been passed', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.updateById(1);
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if data is not an object', () => {
      const func = () => {
        const instance = new CustomerApi(credentials);
        instance.updateById(2, 'sdsd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new CustomerApi(credentials);
      const myData = extend(true, {}, data, { email: getRandomEmailAddress() });
      const request = instance.updateById(2, myData);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should update an customer on providing valid data', (done) => {
      const instance = new CustomerApi(credentials);
      const myData = extend(true, {}, data, { email: getRandomEmailAddress() });
      instance
        .updateById(2, myData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.email).to.equal(myData.email);
          done();
        });
    });
  });
});
