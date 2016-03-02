import { assert } from 'chai';
import Promise from 'bluebird';
import RequestDispatcher from './../lib/RequestDispatcher';
import * as fakeServer from './_fakeServer';

describe('RequestDispatcher', () => {
  // Valid instance.
  const instance = new RequestDispatcher(fakeServer.AUTH);

  // Remove mock server after tests.
  after(() => {
    fakeServer.destroy();
  });

  describe('#constructor', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => new RequestDispatcher();
      assert.throws(sandbox, Error);
    });

    it('throws error on missing user', () => {
      const sandbox = () => new RequestDispatcher({ pass: 'pass' });
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid user', () => {
      const sandbox = () => new RequestDispatcher({ user: 1, pass: 'pass' });
      assert.throws(sandbox, Error);
    });

    it('throws error on missing password', () => {
      const sandbox = () => new RequestDispatcher({ user: 'user' });
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid password', () => {
      const sandbox = () => new RequestDispatcher({ user: 'user', pass: 1 });
      assert.throws(sandbox, Error);
    });

    it('does not throw error on right credentials', () => {
      const sandbox = () => new RequestDispatcher({ user: 'user', pass: 'pass' });
      assert.doesNotThrow(sandbox, Error);
    });
  });

  describe('#get', () => {
    it('throws error on missing URL', () => {
      const sandbox = () => instance.get();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid URL', () => {
      const sandbox = () => instance.get(1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.get(fakeServer.URL), Promise);
    });

    it('resolves the promise', (done) => {
      instance.get(fakeServer.URL)
        .then(() => {
          assert.ok('Response');
          done();
        })
        .catch(() => {
          assert.notOk('Response');
          done();
        });
    });

    it('resolves the promise on right credentials in basic authentication', (done) => {
      instance.get(fakeServer.URL + '/secured')
        .then(() => {
          assert.ok('Response');
          done();
        })
        .catch(() => {
          assert.notOk('Response');
          done();
        });
    });

    it('rejects the promise on "404 Not Found"', (done) => {
      instance.get(fakeServer.URL + '/notfound')
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });

    it('rejects the promise on "500 Internal Server Error"', (done) => {
      instance.get(fakeServer.URL + '/servererror')
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });

    it('rejects the promise on bad credentials in basic authentication', (done) => {
      const badInstance = new RequestDispatcher({ user: 'falsy', pass: '123' });

      badInstance.get(fakeServer.URL + '/secured')
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });
  });

  describe('#post', () => {
    it('throws error on missing URL', () => {
      const sandbox = () => instance.post();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid URL', () => {
      const sandbox = () => instance.post(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid POST data object', () => {
      const sandbox = () => instance.post(fakeServer.URL, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.post(fakeServer.URL, {}), Promise);
    });

    it('resolves the promise', (done) => {
      instance.post(fakeServer.URL, {})
        .then(() => {
          assert.ok('Response');
          done();
        })
        .catch(() => {
          assert.notOk('Response');
          done();
        });
    });

    it('rejects the promise on "404 Not Found"', (done) => {
      instance.post(fakeServer.URL + '/notfound', {})
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });
  });

  describe('#delete', () => {
    it('throws error on missing URL', () => {
      const sandbox = () => instance.delete();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid URL', () => {
      const sandbox = () => instance.delete(1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.delete(fakeServer.URL), Promise);
    });

    it('resolves the promise', (done) => {
      instance.delete(fakeServer.URL)
        .then(() => {
          assert.ok('Response');
          done();
        })
        .catch(() => {
          assert.notOk('Response');
          done();
        });
    });

    it('rejects the promise on "404 Not Found"', (done) => {
      instance.delete(fakeServer.URL + '/notfound')
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });
  });

  describe('#put', () => {
    it('throws error on missing URL', () => {
      const sandbox = () => instance.put();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid URL', () => {
      const sandbox = () => instance.put(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid PUT data object', () => {
      const sandbox = () => instance.put(fakeServer.URL, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.put(fakeServer.URL, {}), Promise);
    });

    it('resolves the promise', (done) => {
      instance.put(fakeServer.URL, {})
        .then(() => {
          assert.ok('Response');
          done();
        })
        .catch(() => {
          assert.notOk('Response');
          done();
        });
    });

    it('rejects the promise on "404 Not Found"', (done) => {
      instance.put(fakeServer.URL + '/notfound', {})
        .then(() => {
          assert.notOk('Response');
          done();
        })
        .catch(() => {
          assert.ok('Response');
          done();
        });
    });
  });
});
