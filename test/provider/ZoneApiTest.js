import { assert } from 'chai';
import Promise from 'bluebird';
import ZoneProvider from './../../lib/provider/ZoneProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';

describe('ZoneProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new ZoneProvider(url, auth);

  // Example zone.
  const zoneId = 81;

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
      assert.instanceOf(instance.getById(zoneId), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .getById(zoneId)
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
});
