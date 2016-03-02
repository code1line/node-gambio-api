import { assert } from 'chai';
import Promise from 'bluebird';
import CategoryProvider from './../../lib/provider/CategoryProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import data from './../_data/category';

describe('CategoryProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new CategoryProvider(url, auth);

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
});
