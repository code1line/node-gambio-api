import { assert } from 'chai';
import Promise from 'bluebird';
import AddressProvider from './../../lib/provider/AddressProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import data from './../_fixtures/address';

describe('AddressProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new AddressProvider(url, auth);

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
        .create(data)
        .then((result) => assert.instanceOf(instance.getById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      // Creates a new item first.
      instance
        .create(data)
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
        .getById(999999)
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
      assert.instanceOf(instance.create(data), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then(() => {
          assert.ok('Creating');
          done();
        })
        .catch(() => {
          assert.notOk('Creating');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .create({})
        .then(() => {
          assert.notOk('Creating');
          done();
        })
        .catch(() => {
          assert.ok('Creating');
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
        .create(data)
        .then((result) => assert.instanceOf(instance.deleteById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      // Creates a new item first.
      instance
        .create(data)
        .then((result) => instance.deleteById(result.id))
        .then(() => {
          assert.ok('Removal');
          done();
        })
        .catch(() => {
          assert.notOk('Removal');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .deleteById(999999999999999)
        .then(() => {
          assert.notOk('Removal');
          done();
        })
        .catch(() => {
          assert.ok('Removal');
          done();
        });
    });
  });

  describe('#updateById', () => {
    // Valid data object for update.
    const updateData = { company: 'Example Inc.' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateById();
      assert.throws(sandbox, Error);
    });

    it('throws error on missing ID', () => {
      const sandbox = () => instance.updateById(null, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID', () => {
      const sandbox = () => instance.updateById(1.2, updateData);
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
        .create(data)
        .then((result) => assert.instanceOf(instance.updateById(result.id, updateData), Promise));
    });

    it('resolves the promise', (done) => {
      // Creates a new item first.
      instance
        .create(data)
        .then((result) => instance.updateById(result.id, updateData))
        .then(() => {
          assert.ok('Update');
          done();
        })
        .catch(() => {
          assert.notOk('Update');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .updateById(999999999999999, updateData)
        .then(() => {
          assert.notOk('Removal');
          done();
        })
        .catch(() => {
          assert.ok('Removal');
          done();
        });
    });
  });
});
