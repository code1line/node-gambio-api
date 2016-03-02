import { assert } from 'chai';
import semver from 'semver';
import GambioApi from './..';
import credentials from './_credentials';

describe('GambioApi', () => {
  // Valid instance.
  const instance = new GambioApi(credentials);

  describe('#constructor', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => new GambioApi();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => new GambioApi(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing URL', () => {
      const myCredentials = {
        user: credentials.user,
        pass: credentials.pass,
      };
      const sandbox = () => new GambioApi(myCredentials);
      assert.throws(sandbox, Error);
    });

    it('does not throw error on valid arguments', () => {
      const sandbox = () => new GambioApi(credentials);
      assert.doesNotThrow(sandbox, Error);
    });
  });

  describe('#getVersion', () => {
    it('is a function', () => {
      assert.isFunction(GambioApi.getVersion);
    });

    it('is a valid version number', () => {
      const validationResult = semver.valid(GambioApi.getVersion());
      assert.isNotNull(validationResult);
    });
  });

  describe('#countries', () => {
    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.countries.getById);
      });
    });
  });

  describe('#zones', () => {
    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.zones.getById);
      });
    });
  });

  describe('#addresses', () => {
    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.addresses.getById);
      });
    });

    describe('#create', () => {
      it('is a function', () => {
        assert.isFunction(instance.addresses.create);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.addresses.deleteById);
      });
    });

    describe('#updateById', () => {
      it('is a function', () => {
        assert.isFunction(instance.addresses.updateById);
      });
    });
  });

  describe('#customers', () => {
    describe('#get', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.get);
      });
    });

    describe('#search', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.search);
      });
    });

    describe('#getGuests', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.getGuests);
      });
    });

    describe('#getAddressesByCustomerId', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.getAddressesByCustomerId);
      });
    });

    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.getById);
      });
    });

    describe('#create', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.create);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.deleteById);
      });
    });

    describe('#updateById', () => {
      it('is a function', () => {
        assert.isFunction(instance.customers.updateById);
      });
    });
  });

  describe('#emails', () => {
    describe('#get', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.get);
      });
    });

    describe('#getPending', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.getPending);
      });
    });

    describe('#getSent', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.getSent);
      });
    });

    describe('#search', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.search);
      });
    });

    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.getById);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.deleteById);
      });
    });

    describe('#queue', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.queue);
      });
    });

    describe('#send', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.send);
      });
    });
  });
});
