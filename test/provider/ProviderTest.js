import { assert } from 'chai';
import Provider from './../../lib/provider/Provider';
import credentials from './../_credentials';

describe('Provider', () => {
  // Valid URL.
  const url = credentials.url;

  // Valid authentication credentials.
  const auth = { user: credentials.user, pass: credentials.pass };

  describe('#constructor', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => new Provider();
      assert.throws(sandbox, Error);
    });

    it('throws error on missing URL', () => {
      const sandbox = () => new Provider(null, auth);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid URL', () => {
      const sandbox = () => new Provider(1, auth);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing authentication object', () => {
      const sandbox = () => new Provider(url);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid authentication object', () => {
      const sandbox = () => new Provider(url, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing user', () => {
      const sandbox = () => new Provider(url, { pass: auth.pass });
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid user', () => {
      const sandbox = () => new Provider(url, { user: 1, pass: auth.pass });
      assert.throws(sandbox, Error);
    });

    it('throws error on missing password', () => {
      const sandbox = () => new Provider(url, { user: auth.user });
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid password', () => {
      const sandbox = () => new Provider(url, { user: auth.user, pass: 1 });
      assert.throws(sandbox, Error);
    });

    it('does not throw error on valid arguments', () => {
      const sandbox = () => new Provider(url, auth);
      assert.doesNotThrow(sandbox, Error);
    });
  });
});
