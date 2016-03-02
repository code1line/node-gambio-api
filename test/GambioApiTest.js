import { assert } from 'chai';
import semver from 'semver';
import GambioApi from './..';
import credentials from './_credentials';

describe('GambioApi', () => {
  // Valid instance.
  const instance = new GambioApi(credentials);

  describe('#constructor', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => new GambioApi();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => new GambioApi(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing URL', () => {
      const myCredentials = {
        user: credentials.user,
        pass: credentials.pass,
      };
      const sandbox = () => new GambioApi();
      assert.throws(sandbox, Error);
    });
  });

  describe('#getVersion', () => {
    it('should be a function', () => {
      expect(GambioApi.getVersion).to.be.a('function');
    });

    it('should be a valid version number', () => {
      const validateVersion = semver.valid(GambioApi.getVersion());
      expect(validateVersion).not.to.be.a('null');
    });
  });

  describe('#countries', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        expect(testInstance.countries.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.countries.getById(80)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#getZonesByCountryId', () => {
      it('should be a function', () => {
        expect(testInstance.countries.getZonesByCountryId).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.countries.getZonesByCountryId(80)
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });
  });

  describe('#zones', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        expect(testInstance.zones.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.zones.getById(80)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#addresses', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        expect(testInstance.addresses.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.addresses.getById(10)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#create', () => {
      it('should be a function', () => {
        expect(testInstance.addresses.create).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.addresses.create({})
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        expect(testInstance.addresses.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.addresses.deleteById(9999)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#updateById', () => {
      it('should be a function', () => {
        expect(testInstance.addresses.updateById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.addresses.updateById(9998, { company: 'test' })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#customers', () => {
    // Customer test data.
    const data = {
      gender: 'm',
      firstname: 'John',
      lastname: 'Doe',
      dateOfBirth: '1985-02-13',
      vatNumber: '0923429837942',
      telephone: '2343948798345',
      fax: '2093049283',
      email: `customer@test.com`,
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

    beforeEach(() => {
      const email = `gambio.js.api.${Math.random() * (100000 - 100) + 100}@test.com`;
      extend(true, data, { email });
    });

    describe('#get', () => {
      it('should be a function', () => {
        expect(testInstance.customers.get).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.get()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });

      it('should return a result with sorting', (done) => {
        testInstance.customers.get({ id: 'desc' })
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].id).to.be.above(result[1].id);
            done();
          });
      });
    });

    describe('#search', () => {
      it('should be a function', () => {
        expect(testInstance.customers.search).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.search('test')
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getGuests', () => {
      it('should be a function', () => {
        expect(testInstance.customers.getGuests).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.getGuests()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getAddressesByCustomerId', () => {
      it('should be a function', () => {
        expect(testInstance.customers.getAddressesByCustomerId).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.getAddressesByCustomerId(28)
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getById', () => {
      it('should be a function', () => {
        expect(testInstance.customers.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.getById(28)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#create', () => {
      it('should be a function', () => {
        expect(testInstance.customers.create).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.create(data)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        expect(testInstance.customers.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers
          .create(data)
          .then((result) => {
            return testInstance.customers.deleteById(result.id);
          })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#updateById', () => {
      it('should be a function', () => {
        expect(testInstance.customers.updateById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.customers.updateById(28, { firstname: 'test' })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#emails', () => {
    // E-Mail test data.
    const data = {
      subject: 'Test Subject',
      sender: {
        emailAddress: 'sender@email.de',
        contactName: 'John Doe',
      },
      recipient: {
        emailAddress: 'recipient@email.de',
        contactName: 'Jane Doe',
      },
      replyTo: {
        emailAddress: 'reply_to@email.de',
        contactName: 'John Doe (Reply To)',
      },
      contentHtml: '<strong>HTML Content</content>',
      contentPlain: 'Plain Content',
      bcc: [
        {
          emailAddress: 'bcc@email.de',
          contactName: 'Chris Doe',
        },
      ],
      cc: [
        {
          emailAddress: 'cc@email.de',
          contactName: 'Chloe Doe',
        },
      ],
    };

    describe('#get', () => {
      it('should be a function', () => {
        expect(testInstance.emails.get).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.get()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });

      it('should return a result with sorting', (done) => {
        testInstance.emails.get({ id: 'desc' })
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].id).to.be.above(result[1].id);
            done();
          });
      });
    });

    describe('#getPending', () => {
      it('should be a function', () => {
        expect(testInstance.emails.getPending).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.getPending()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getSent', () => {
      it('should be a function', () => {
        expect(testInstance.emails.getSent).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.getSent()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#search', () => {
      it('should be a function', () => {
        expect(testInstance.emails.search).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.search('test')
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getById', () => {
      it('should be a function', () => {
        expect(testInstance.emails.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.queue(data)
          .then((result) => {
            return testInstance.emails.getById(result.id);
          })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        expect(testInstance.emails.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.queue(data)
          .then((result) => {
            return testInstance.emails.deleteById(result.id);
          })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#queue', () => {
      it('should be a function', () => {
        expect(testInstance.emails.queue).to.be.a('function');
      });

      it('should return a result', (done) => {
        testInstance.emails.queue(data)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(data.subject).to.equal(data.subject);
            done();
          });
      });
    });

    describe('#send', () => {
      it('should be a function', () => {
        expect(testInstance.emails.send).to.be.a('function');
      });

      it('should return a result on sending with data', (done) => {
        testInstance.emails.send(null, data)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(data.subject).to.equal(data.subject);
            done();
          });
      });

      it('should return a result on sending with ID', (done) => {
        testInstance.emails.queue(data)
          .then((result) => {
            return testInstance.emails.send(result.id);
          })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });
});
