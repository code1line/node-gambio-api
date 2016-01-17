const expect = require('chai').expect;

const extend = require('extend');
const Promise = require('bluebird');

const Api = require('../lib/api/Api');
const EmailApi = require('../lib/api/EmailApi');

const InvalidArgumentError = require('../lib/error/InvalidArgumentError');
const NoArgumentError = require('../lib/error/NoArgumentError');
const ClientError = require('../lib/error/ClientError');
const RequestError = require('../lib/error/RequestError');

const demoCredentials = require('../demo/credentials');

// Test credentials.
const credentials = extend(
  true,
  {},
  demoCredentials,
  { url: `${demoCredentials.url}/api.php/v2` }
);

// Test data.
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

// Path to test attachment file.
const attachmentFile = `${__dirname}/testUploadFile.txt`;

describe('EmailApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new EmailApi(credentials);
      expect(instance).to.be.instanceOf(Api);
    });
  });

  describe('#get', () => {
    it('should throw InvalidArgumentError on passing invalid optional argument', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.get(123);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a instance of Promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.get();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new EmailApi(credentials);
      instance.get()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });

    it('should return sorted result in resolved promise when criteria is passed', (done) => {
      const instance = new EmailApi(credentials);
      instance.get({ id: 'desc' })
        .then((result) => {
          if (result.length > 1) {
            expect(result[0].id).to.be.above(result[1].id);
          } else {
            expect(result).to.be.a('array');
          }
          done();
        });
    });
  });

  describe('#getPending', () => {
    it('should return a instance of Promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.getPending();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new EmailApi(credentials);
      instance.getPending()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getSent', () => {
    it('should return a instance of Promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.getSent();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new EmailApi(credentials);
      instance.getSent()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#search', () => {
    it('should throw NoArgumentError on missing argument', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.search();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on invalid type of argument', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.search(2123);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a instance of Promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.search('test');
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result in a resolved promise', (done) => {
      const instance = new EmailApi(credentials);
      instance.search('test')
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.getById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.getById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.getById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.getById(15);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result on valid ID', (done) => {
      const id = 15;
      const instance = new EmailApi(credentials);
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
      const instance = new EmailApi(credentials);
      instance
        .getById(id)
        .catch((error) => {
          expect(error).to.be.instanceOf(ClientError);
          done();
        });
    });
  });

  describe('#queue', () => {
    it('should throw NoArgumentError if no object has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.queue();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an object', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.queue('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.queue(data);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should queue a new customer on valid data', (done) => {
      const instance = new EmailApi(credentials);
      instance
        .queue(data)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.subject).to.equal(data.subject);
          done();
        });
    });
  });

  describe('#send', () => {
    it('should throw NoArgumentError if no argument has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if invalid ID has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send('1121');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if invalid data object has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send(null, '123');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should work with undefined ID and data object as parameters', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send(undefined, data);
      };
      expect(func).not.to.throw(InvalidArgumentError);
    });

    it('should work with null ID and data object as parameters', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send(null, data);
      };
      expect(func).not.to.throw(InvalidArgumentError);
    });

    it('should work with ID as single parameter', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.send(16);
      };
      expect(func).not.to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.send(null, data);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should send a new E-Mail on valid data', (done) => {
      const instance = new EmailApi(credentials);
      instance
        .send(null, data)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.subject).to.equal(data.subject);
          done();
        });
    });
  });

  describe('#deleteById', () => {
    it('should throw NoArgumentError if no ID has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.deleteById();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not an integer', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.deleteById(2.5);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw InvalidArgumentError if argument is not a number', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.deleteById('asdsadasd');
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should return a promise', () => {
      const instance = new EmailApi(credentials);
      instance
        .send(null, data)
        .then((response) => {
          const request = instance.deleteById(response.id);
          expect(request).to.be.an.instanceOf(Promise);
        });
    });

    it('should return a result on valid ID', (done) => {
      const instance = new EmailApi(credentials);
      instance
        .send(null, data)
        .then((createResponse) => {
          instance
            .deleteById(createResponse.id)
            .then((response) => {
              expect(response).to.be.a('object');
              done();
            });
        });
    });
  });

  describe.skip('#uploadAttachment', () => {
    it('should throw NoArgumentError if no file has been passed', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.uploadAttachment();
      };
      expect(func).to.throw(NoArgumentError);
    });

    it('should throw InvalidArgumentError on wrong argument type', () => {
      const func = () => {
        const instance = new EmailApi(credentials);
        instance.uploadAttachment(2213);
      };
      expect(func).to.throw(InvalidArgumentError);
    });

    it('should throw RequestError on wrong file path', (done) => {
      const instance = new EmailApi(credentials);
      instance
        .uploadAttachment('2213')
        .catch((error) => {
          expect(error).to.be.instanceOf(RequestError);
          done();
        });
    });

    it('should return a instance of Promise', () => {
      const instance = new EmailApi(credentials);
      const request = instance.uploadAttachment(attachmentFile);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should work with file path string', (done) => {
      const instance = new EmailApi(credentials);
      instance
        .uploadAttachment(attachmentFile)
        .then((response) => {
          console.log(response);
          done();
        })
        .catch((error) => {
          console.error(error);
          done();
        });
    });
  });
});
