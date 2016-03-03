import { assert } from 'chai';
import Promise from 'bluebird';
import EmailProvider from './../../lib/provider/EmailProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import data from './../_data/email';


describe('EmailProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new EmailProvider(url, auth);

  describe('#get', () => {
    it('returns a promise', () => {
      assert.instanceOf(instance.get(), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .get()
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });
  });

  describe('#getPending', () => {
    it('returns a promise', () => {
      assert.instanceOf(instance.getPending(), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .getPending()
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });
  });

  describe('#getSent', () => {
    it('returns a promise', () => {
      assert.instanceOf(instance.getSent(), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .getSent()
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });
  });

  describe('#search', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.search();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.search(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.search('test'), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .search('test')
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .search('üüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüüü')
        .then(() => {
          assert.notOk('Fetching');
          done();
        })
        .catch(() => {
          assert.ok('Fetching');
          done();
        });
    });
  });

  describe('#getById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.getById(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .queue(data)
        .then((result) => assert.instanceOf(instance.getById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .queue(data)
        .then((result) => instance.getById(result.id))
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .getById(99999999999999999999999999999999999)
        .then(() => {
          assert.notOk('Fetching');
          done();
        })
        .catch(() => {
          assert.ok('Fetching');
          done();
        });
    });
  });

  describe('#queue', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.queue();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.queue(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.queue(data), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .queue(data)
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .queue({})
        .then(() => {
          assert.notOk('Fetching');
          done();
        })
        .catch(() => {
          assert.ok('Fetching');
          done();
        });
    });
  });

  describe('#send', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.send();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID argument', () => {
      const sandbox = () => instance.send('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data argument', () => {
      const sandbox = () => instance.send(null, 1);
      assert.throws(sandbox, Error);
    });

    it('returns promise on sending by ID', () => {
      instance
        .queue(data)
        .then((result) => assert.instanceOf(instance.send(result.id), Promise));
    });

    it('returns promise on sending by data object', () => {
      assert.instanceOf(instance.send(null, data), Promise);
    });
  });

  describe('#deleteById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID argument', () => {
      const sandbox = () => instance.deleteById('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .queue(data)
        .then((result) => assert.instanceOf(instance.deleteById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .queue(data)
        .then((result) => instance.deleteById(result.id))
        .then(() => {
          assert.ok('Fetching');
          done();
        })
        .catch(() => {
          assert.notOk('Fetching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .deleteById(99999999999999999999999999999999999)
        .then(() => {
          assert.notOk('Fetching');
          done();
        })
        .catch(() => {
          assert.ok('Fetching');
          done();
        });
    });
  });

  describe('#uploadAttachment', () => {
    // Valid file path.
    const path = `${__dirname}/../_data/email.js`;

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.uploadAttachment();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid path', () => {
      const sandbox = () => instance.uploadAttachment(2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.uploadAttachment(path), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .uploadAttachment(path)
        .then(() => {
          assert.ok('Uploading');
          done();
        })
        .catch((e) => {
          console.log(e);
          assert.notOk('Uploading');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .uploadAttachment('asdsadsadasd')
        .then(() => {
          assert.notOk('Uploading');
          done();
        })
        .catch(() => {
          assert.ok('Uploading');
          done();
        });
    });
  });
});
