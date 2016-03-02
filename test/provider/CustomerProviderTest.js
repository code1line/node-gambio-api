import { assert } from 'chai';
import Promise from 'bluebird';
import CustomerProvider from './../../lib/provider/CustomerProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import getData from './../_data/customer';

describe('CustomerProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new CustomerProvider(url, auth);

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

  describe('#getGuests', () => {
    it('returns a promise', () => {
      assert.instanceOf(instance.getGuests(), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .getGuests()
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

  describe('#getAddressesByCustomerId', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getAddressesByCustomerId();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.getAddressesByCustomerId(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(getData())
        .then((result) => assert.instanceOf(instance.getAddressesByCustomerId(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(getData())
        .then((result) => instance.getAddressesByCustomerId(result.id))
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
        .getAddressesByCustomerId(99999999999999999999999999999999999)
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
        .create(getData())
        .then((result) => assert.instanceOf(instance.getById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(getData())
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

  describe('#create', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.create();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.create(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.create(getData()), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .create(getData())
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
        .create({})
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

  describe('#deleteById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.deleteById(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(getData())
        .then((result) => assert.instanceOf(instance.deleteById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(getData())
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

  describe('#updateById', () => {
    // Valid update data.
    const updateData = { firstname: 'Marcus' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateById();
      assert.throws(sandbox, Error);
    });

    it('throws error on missing ID', () => {
      const sandbox = () => instance.updateById(null, getData());
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID', () => {
      const sandbox = () => instance.updateById(1.23, getData());
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data object', () => {
      const sandbox = () => instance.updateById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data object', () => {
      const sandbox = () => instance.updateById(1, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(getData())
        .then((result) => assert.instanceOf(instance.updateById(result.id, updateData), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(getData())
        .then((result) => instance.updateById(result.id, updateData))
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
        .updateById(99999999999999999999999999999999999, updateData)
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
});
