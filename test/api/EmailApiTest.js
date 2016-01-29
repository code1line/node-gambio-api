const expect = require('chai').expect;

const Promise = require('bluebird');
const errors = require('common-errors');

const Api = require('./../../lib/api/Api');
const EmailApi = require('./../../lib/api/EmailApi');
const manipulatorTest = require('./../_manipulatorTestHelper');
const credentials = require('./../_credentials');

const testUrl = credentials.url + `/${credentials.apiSuffix}`;
const testAuth = {
  user: credentials.user,
  pass: credentials.pass,
};
const testData = {
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
const testInstance = new EmailApi(testUrl, testAuth);


describe('EmailApi', () => {
  describe('#constructor', () => {
    it('should be an instance of Api', () => {
      const instance = new EmailApi(testUrl, testAuth);
      expect(instance).to.be.instanceOf(Api);
    });

    it('should work if all arguments has been passed', () => {
      const sandbox = () => new EmailApi(testUrl, testAuth);
      expect(sandbox).not.to.throw(Error);
    });
  });

  describe('#get', () => {
    manipulatorTest({
      testedObject: testInstance,
      methodName: 'get',
      limitedFields: ['subject'],
      excludedField: 'sender',
    });

    it('should return a promise', () => {
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

  describe('#getPending', () => {
    manipulatorTest({
      testedObject: testInstance,
      methodName: 'getPending',
      limitedFields: ['subject'],
      excludedField: 'sender',
    });

    it('should return a promise', () => {
      const request = testInstance.getPending();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.getPending()
        .then((result) => {
          expect(result).to.be.a('array');
          done();
        });
    });
  });

  describe('#getSent', () => {
    manipulatorTest({
      testedObject: testInstance,
      methodName: 'getSent',
      limitedFields: ['subject'],
      excludedField: 'sender',
    });

    it('should return a promise', () => {
      const request = testInstance.getSent();
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return result', (done) => {
      testInstance.getSent()
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

    it('should return a instance of Promise', () => {
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
      const request = testInstance.getById(15);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should return a result', (done) => {
      const id = 15;
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

  describe('#queue', () => {
    it('should throw ArgumentNullError on missing argument', () => {
      const sandbox = () => testInstance.queue();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if argument is not an object', () => {
      const sandbox = () => testInstance.queue('asdsadasd');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should return a promise', () => {
      const request = testInstance.queue(testData);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should queue a new E-Mail', (done) => {
      testInstance
        .queue(testData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.subject).to.equal(testData.subject);
          done();
        });
    });
  });

  describe('#send', () => {
    it('should throw ArgumentNullError if no arguments have been passed', () => {
      const sandbox = () => testInstance.send();
      expect(sandbox).to.throw(errors.ArgumentNullError);
    });

    it('should throw ArgumentError if invalid ID argument has been passed', () => {
      const sandbox = () => testInstance.send('1121');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should throw ArgumentError if invalid data argument has been passed', () => {
      const sandbox = () => testInstance.send(null, '123');
      expect(sandbox).to.throw(errors.ArgumentError);
    });

    it('should work with undefined ID and data object as parameters', () => {
      const sandbox = () => testInstance.send(undefined, testData);
      expect(sandbox).not.to.throw(Error);
    });

    it('should work with null ID and data object as parameters', () => {
      const sandbox = () => testInstance.send(null, testData);
      expect(sandbox).not.to.throw(Error);
    });

    it('should work with ID as single parameter', () => {
      const sandbox = () => testInstance.send(16);
      expect(sandbox).not.to.throw(Error);
    });

    it('should return a promise', () => {
      const request = testInstance.send(null, testData);
      expect(request).to.be.an.instanceOf(Promise);
    });

    it('should send a new E-Mail', (done) => {
      testInstance
        .send(null, testData)
        .then((response) => {
          expect(response).to.be.a('object');
          expect(response.id).to.be.a('number');
          expect(response.subject).to.equal(testData.subject);
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
      testInstance
        .send(null, testData)
        .then((response) => {
          const request = testInstance.deleteById(response.id);
          expect(request).to.be.an.instanceOf(Promise);
        });
    });

    it('should return a result', (done) => {
      testInstance
        .send(null, testData)
        .then((response) => {
          return testInstance.deleteById(response.id);
        })
        .then((response) => {
          expect(response).to.be.a('object');
          done();
        });
    });
  });
});
