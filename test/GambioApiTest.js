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

    describe('#uploadAttachment', () => {
      it('is a function', () => {
        assert.isFunction(instance.emails.uploadAttachment);
      });
    });
  });

  describe('#categories', () => {
    describe('#create', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.create);
      });
    });

    describe('#deleteIcon', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.deleteIcon);
      });
    });

    describe('#deleteImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.deleteImage);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.deleteById);
      });
    });

    describe('#get', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.get);
      });
    });

    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.getById);
      });
    });

    describe('#search', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.search);
      });
    });

    describe('#renameIcon', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.renameIcon);
      });
    });

    describe('#renameImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.renameImage);
      });
    });

    describe('#updateById', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.updateById);
      });
    });

    describe('#uploadIcon', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.uploadIcon);
      });
    });

    describe('#uploadImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.categories.uploadImage);
      });
    });
  });

  describe('#orders', () => {
    describe('#createItemAttribute', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.createItemAttribute);
      });
    });

    describe('#createItem', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.createItem);
      });
    });

    describe('#createTotal', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.createTotal);
      });
    });

    describe('#create', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.create);
      });
    });

    describe('#deleteItemAttributeById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.deleteItemAttributeById);
      });
    });

    describe('#deleteItemById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.deleteItemById);
      });
    });

    describe('#deleteTotalById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.deleteTotalById);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.deleteById);
      });
    });

    describe('#getHistory', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getHistory);
      });
    });

    describe('#getHistoryById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getHistoryById);
      });
    });

    describe('#searchHistory', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.searchHistory);
      });
    });

    describe('#getItemAttributes', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getItemAttributes);
      });
    });

    describe('#getItemAttributeById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getItemAttributeById);
      });
    });

    describe('#searchItemAttributes', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.searchItemAttributes);
      });
    });

    describe('#getItems', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getItems);
      });
    });

    describe('#getItemById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getItemById);
      });
    });

    describe('#searchItems', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.searchItems);
      });
    });

    describe('#getTotals', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getTotals);
      });
    });

    describe('#getTotalById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getTotalById);
      });
    });

    describe('#searchTotals', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.searchTotals);
      });
    });

    describe('#get', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.get);
      });
    });

    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.getById);
      });
    });

    describe('#search', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.search);
      });
    });

    describe('#updateItemAttributeById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.updateItemAttributeById);
      });
    });

    describe('#updateItemById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.updateItemById);
      });
    });

    describe('#updateStatus', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.updateStatus);
      });
    });

    describe('#updateTotalById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.updateTotalById);
      });
    });

    describe('#updateById', () => {
      it('is a function', () => {
        assert.isFunction(instance.orders.updateById);
      });
    });
  });

  describe('#products', () => {
    describe('#changeCategoryLink', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.changeCategoryLink);
      });
    });

    describe('#create', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.create);
      });
    });

    describe('#deleteImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.deleteImage);
      });
    });

    describe('#deleteById', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.deleteById);
      });
    });

    describe('#getCategoryLinks', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.getCategoryLinks);
      });
    });

    describe('#get', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.get);
      });
    });

    describe('#getById', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.getById);
      });
    });

    describe('#search', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.search);
      });
    });

    describe('#renameImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.renameImage);
      });
    });

    describe('#updateById', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.updateById);
      });
    });

    describe('#uploadImage', () => {
      it('is a function', () => {
        assert.isFunction(instance.products.uploadImage);
      });
    });
  });
});
