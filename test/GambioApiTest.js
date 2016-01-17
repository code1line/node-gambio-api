const expect = require('chai').expect;

const extend = require('extend');

const GambioApi = require('../.');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');

const demoCredentials = require('../demo/credentials');

describe('GambioApi', () => {
  describe('#constructor', () => {
    it('should throw NoArgumentError on instantiating without credentials', () => {
      const func = () => new GambioApi();
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on instantiating with invalid credentials', () => {
      const func = () => new GambioApi('s');
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should work on instantiating with valid credentials', () => {
      const func = () => new GambioApi(demoCredentials);
      expect(func).not.to.throw(Error);
    });

    it('should throw InvalidArgumentError on instantiating with invalid version type', () => {
      const credentials = extend(true, {}, demoCredentials, { version: 234 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing URL', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.url;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong URL type', () => {
      const credentials = extend(true, {}, demoCredentials, { url: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing user', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.user;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong user type', () => {
      const credentials = extend(true, {}, demoCredentials, { user: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw NoArgument on missing password', () => {
      const credentials = extend(true, {}, demoCredentials);
      delete credentials.pass;
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong password type', () => {
      const credentials = extend(true, {}, demoCredentials, { pass: 123 });
      const func = () => new GambioApi(credentials);
      expect(func).to.throw(InvalidArgumentError);
    });
  });

  describe('#countries', () => {
    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.countries.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.countries.getById(80)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#getZonesByCountryId', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.countries.getZonesByCountryId).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.countries.getZonesByCountryId(80)
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
        const API = new GambioApi(demoCredentials);
        expect(API.zones.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.zones.getById(80)
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
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.getById(10)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#create', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.create).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.create({})
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.deleteById(9999)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#updateById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.addresses.updateById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.addresses.updateById(9998, { company: 'test' })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#customers', () => {
    describe('#get', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.get).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.get()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });

      it('should return a result with sorting', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.get({ id: 'desc' })
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].id).to.be.above(result[1].id);
            done();
          });
      });
    });

    describe('#search', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.search).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.search('test')
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getGuests', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.getGuests).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.getGuests()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getAddressesByCustomerId', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.getAddressesByCustomerId).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.getAddressesByCustomerId(28)
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.getById(28)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#create', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.create).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);

        // Test data.
        const data = {
          gender: 'm',
          firstname: 'John',
          lastname: 'Doe',
          dateOfBirth: '1985-02-13',
          vatNumber: '0923429837942',
          telephone: '2343948798345',
          fax: '2093049283',
          email: `customer${Math.random() * (100000 - 100) + 100}@email.de`,
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

        API.customers.create(data)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.deleteById(32)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#updateById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.customers.updateById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.customers.updateById(28, { firstname: 'test' })
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });

  describe('#emails', () => {
    describe('#get', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.get).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.get()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });

      it('should return a result with sorting', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.get({ id: 'desc' })
          .then((result) => {
            expect(result).to.be.a('array');
            expect(result[0].id).to.be.above(result[1].id);
            done();
          });
      });
    });

    describe('#getPending', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.getPending).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.getPending()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getSent', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.getSent).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.getSent()
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#search', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.search).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.search('test')
          .then((result) => {
            expect(result).to.be.a('array');
            done();
          });
      });
    });

    describe('#getById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.getById).to.be.a('function');
      });

      it('should return a result', (done) => {
        const API = new GambioApi(demoCredentials);
        API.emails.getById(15)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });

    describe('#deleteById', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.deleteById).to.be.a('function');
      });

      it('should return a result', (done) => {
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

        const API = new GambioApi(demoCredentials);

        API.emails
          .send(null, data)
            .then((result) => {
              API.emails.deleteById(result.id)
                .then((result2) => {
                  expect(result2).to.be.a('object');
                  done();
                });
            });
      });
    });

    describe('#queue', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.queue).to.be.a('function');
      });

      it('should return a result', (done) => {
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

        const API = new GambioApi(demoCredentials);

        API.emails.queue(data)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(data.subject).to.equal(data.subject);
            done();
          });
      });
    });

    describe('#send', () => {
      it('should be a function', () => {
        const API = new GambioApi(demoCredentials);
        expect(API.emails.send).to.be.a('function');
      });

      it('should return a result on sending with data', (done) => {
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

        const API = new GambioApi(demoCredentials);

        API.emails.send(null, data)
          .then((result) => {
            expect(result).to.be.a('object');
            expect(data.subject).to.equal(data.subject);
            done();
          });
      });

      it('should return a result on sending with ID', (done) => {
        const API = new GambioApi(demoCredentials);

        API.emails.send(16)
          .then((result) => {
            expect(result).to.be.a('object');
            done();
          });
      });
    });
  });
});
