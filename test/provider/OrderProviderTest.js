import { assert } from 'chai';
import Promise from 'bluebird';
import OrderProvider from './../../lib/provider/OrderProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import data from './../_data/order';
import itemAttributeData from './../_data/orderItemAttribute';
import itemData from './../_data/orderItem';
import totalData from './../_data/orderTotal';
import statusData from './../_data/orderStatus';

describe('OrderProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new OrderProvider(url, auth);

  describe('#createItemAttribute', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.createItemAttribute();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.createItemAttribute('test', 1, {});
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item ID', () => {
      const sandbox = () => instance.createItemAttribute(1, null, {});
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item ID', () => {
      const sandbox = () => instance.createItemAttribute(1, 'test', {});
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.createItemAttribute(1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.createItemAttribute(1, 1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(
            instance.createItemAttribute(orderId, orderItemId, itemAttributeData),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
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
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, {});
        })
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

  describe('#createItem', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.createItem();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.createItem('test', itemData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.createItem('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.createItem(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => {
          assert.instanceOf(
            instance.createItem(result.id, itemData),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.createItem(result.id, itemData))
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
        .create(data)
        .then((result) => instance.createItem(result.id, {}))
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

  describe('#createTotal', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.createTotal();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.createTotal('test', totalData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.createTotal('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.createTotal(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => {
          assert.instanceOf(
            instance.createTotal(result.id, totalData),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.createTotal(result.id, totalData))
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
        .create(data)
        .then((result) => instance.createTotal(result.id, {}))
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

  describe('#deleteItemAttributeById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteItemAttributeById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.deleteItemAttributeById('test', 1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item ID', () => {
      const sandbox = () => instance.deleteItemAttributeById(1, null, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item ID', () => {
      const sandbox = () => instance.deleteItemAttributeById(1, 'test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item attribute ID', () => {
      const sandbox = () => instance.deleteItemAttributeById(1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item attribute ID', () => {
      const sandbox = () => instance.deleteItemAttributeById(1, 1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          assert.instanceOf(
            instance.deleteItemAttributeById(orderId, orderItemId, orderItemAttributeId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          return instance.deleteItemAttributeById(orderId, orderItemId, orderItemAttributeId);
        })
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
      const id = 99999999999999999;
      instance.deleteItemAttributeById(id, id, id)
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

  describe('#deleteItemById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteItemById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.deleteItemById('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item ID', () => {
      const sandbox = () => instance.deleteItemById(1, null);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item ID', () => {
      const sandbox = () => instance.deleteItemById(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(
            instance.deleteItemById(orderId, orderItemId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.deleteItemById(orderId, orderItemId);
        })
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
      const id = 99999999999999999;
      instance.deleteItemById(id, id)
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

  describe('#deleteTotalById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteTotalById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.deleteTotalById('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order total ID', () => {
      const sandbox = () => instance.deleteTotalById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order total ID', () => {
      const sandbox = () => instance.deleteTotalById(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderTotalId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => {
          orderTotalId = result.id;
          assert.instanceOf(
            instance.deleteTotalById(orderId, orderTotalId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderTotalId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => {
          orderTotalId = result.id;
          return instance.deleteTotalById(orderId, orderTotalId);
        })
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
      const id = 99999999999999999;
      instance.deleteTotalById(id, id)
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

  describe('#deleteById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.deleteById('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.deleteById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
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
      instance.deleteById(99999999999999999999)
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

  describe('#getHistory', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getHistory();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getHistory('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.getHistory(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.getHistory(result.id))
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
      instance.getHistory(99999999999999999999)
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

  describe('#getHistoryById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getHistoryById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getHistoryById('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order status history ID', () => {
      const sandbox = () => instance.getHistoryById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order status history ID', () => {
      const sandbox = () => instance.getHistoryById(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let historyId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.updateStatus(orderId, statusData);
        })
        .then((result) => {
          historyId = result.id;
          assert.instanceOf(instance.getHistoryById(orderId, historyId), Promise);
        });
    });

    it('resolves the promise', (done) => {
      let orderId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.updateStatus(orderId, statusData);
        })
        .then((result) => instance.getHistoryById(orderId, result.id))
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
      const id = 99999999999;

      instance.getHistoryById(id, id)
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

  describe('#searchHistory', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.searchHistory();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.searchHistory('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing search term', () => {
      const sandbox = () => instance.searchHistory(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid search term', () => {
      const sandbox = () => instance.searchHistory(1, 2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.searchHistory(result.id, ''), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.searchHistory(result.id, ''))
        .then(() => {
          assert.ok('Searching');
          done();
        })
        .catch(() => {
          assert.notOk('Searching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .searchHistory(99999999999999999999, '')
        .then(() => {
          assert.notOk('Searching');
          done();
        })
        .catch(() => {
          assert.ok('Searching');
          done();
        });
    });
  });

  describe('#getItemAttributes', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getItemAttributes();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getItemAttributes('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing item ID', () => {
      const sandbox = () => instance.getItemAttributes(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid item ID', () => {
      const sandbox = () => instance.getItemAttributes(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(instance.getItemAttributes(orderId, orderItemId), Promise);
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(instance.getItemAttributes(orderId, orderItemId), Promise);
        })
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
      instance.getItemAttributes(99999999999999999999, 999999999999999)
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

  describe('#getItemAttributeById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getItemAttributeById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getItemAttributeById('test', 1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing item ID', () => {
      const sandbox = () => instance.getItemAttributes(1, null, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid item ID', () => {
      const sandbox = () => instance.getItemAttributes(1, 'test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item attribute ID', () => {
      const sandbox = () => instance.getItemAttributeById(1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item attribute ID', () => {
      const sandbox = () => instance.getItemAttributeById(1, 1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          assert.instanceOf(
            instance.getItemAttributeById(orderId, orderItemId, orderItemAttributeId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          return instance.getItemAttributeById(orderId, orderItemId, orderItemAttributeId);
        })
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
      const id = 999999999999999999999;

      instance
        .getItemAttributeById(id, id, id)
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

  describe('#searchItemAttributes', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.searchItemAttributes();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.searchItemAttributes('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing search term', () => {
      const sandbox = () => instance.searchItemAttributes(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid search term', () => {
      const sandbox = () => instance.searchItemAttributes(1, 2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.searchHistory(result.id, ''), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.searchHistory(result.id, ''))
        .then(() => {
          assert.ok('Searching');
          done();
        })
        .catch(() => {
          assert.notOk('Searching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .searchHistory(99999999999999999999, '')
        .then(() => {
          assert.notOk('Searching');
          done();
        })
        .catch(() => {
          assert.ok('Searching');
          done();
        });
    });
  });

  describe('#getItems', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getItems();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getItems('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.getItems(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.getItems(result.id))
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
      instance.getItems(99999999999999999999)
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

  describe('#getItemById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getItemById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getItemById('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item ID', () => {
      const sandbox = () => instance.getItemById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item ID', () => {
      const sandbox = () => instance.getItemById(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(
            instance.getItemById(orderId, orderItemId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => instance.getItemById(orderId, result.id))
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
      const id = 999999999999999;

      instance
        .getItemById(id, id)
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

  describe('#searchItems', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.searchItems();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.searchItems('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing search term', () => {
      const sandbox = () => instance.searchItems(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid search term', () => {
      const sandbox = () => instance.searchItems(1, 2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.searchItems(result.id, ''), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.searchItems(result.id, ''))
        .then(() => {
          assert.ok('Searching');
          done();
        })
        .catch(() => {
          assert.notOk('Searching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .searchItems(99999999999999999999, '')
        .then(() => {
          assert.notOk('Searching');
          done();
        })
        .catch(() => {
          assert.ok('Searching');
          done();
        });
    });
  });

  describe('#getTotals', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getTotals();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getTotals('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.getTotals(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.getTotals(result.id))
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
      instance.getTotals(99999999999999999999)
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

  describe('#getTotalById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getTotalById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getTotalById('test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order total ID', () => {
      const sandbox = () => instance.getTotalById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order total ID', () => {
      const sandbox = () => instance.getTotalById(1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderTotalId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => {
          orderTotalId = result.id;
          assert.instanceOf(
            instance.getTotalById(orderId, orderTotalId),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderTotalId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => {
          orderTotalId = result.id;
          return instance.getTotalById(orderId, orderTotalId);
        })
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
      const id = 99999999999999999;
      instance.getTotalById(id, id)
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

  describe('#searchTotals', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.searchTotals();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.searchTotals('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing search term', () => {
      const sandbox = () => instance.searchTotals(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid search term', () => {
      const sandbox = () => instance.searchTotals(1, 2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.searchTotals(result.id, ''), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.searchTotals(result.id, ''))
        .then(() => {
          assert.ok('Searching');
          done();
        })
        .catch(() => {
          assert.notOk('Searching');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .searchTotals(99999999999999999999, '')
        .then(() => {
          assert.notOk('Searching');
          done();
        })
        .catch(() => {
          assert.ok('Searching');
          done();
        });
    });
  });

  describe('#get', () => {
    it('returns a promise', () => {
      assert.instanceOf(instance.get(), Promise);
    });

    it('resolves the promise', (done) => {
      instance.get()
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

  describe('#getById', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.getById('test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.getById(result.id), Promise));
    });

    it('resolves the promise', (done) => {
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
      instance.getById(99999999999999)
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

  describe('#search', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.search();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid search term', () => {
      const sandbox = () => instance.search(1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.search(''), Promise);
    });

    it('resolves the promise', (done) => {
      instance.search('')
        .then(() => {
          assert.ok('Searching');
          done();
        })
        .catch(() => {
          assert.notOk('Searching');
          done();
        });
    });
  });

  describe('#updateItemAttributeById', () => {
    // Valid update data.
    const updateData = { name: 'Size' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateItemAttributeById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.updateItemAttributeById('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing item ID', () => {
      const sandbox = () => instance.updateItemAttributeById(1, null, 1, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid item ID', () => {
      const sandbox = () => instance.updateItemAttributeById(1, 'test', 1, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing attribute ID', () => {
      const sandbox = () => instance.updateItemAttributeById(1, 1, null, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid attribute ID', () => {
      const sandbox = () => instance.updateItemAttributeById(1, 1, 'test', updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.updateItemAttributeById(1, 1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.updateItemAttributeById(1, 1, 1, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          assert.instanceOf(
            instance.updateItemAttributeById(
              orderId,
              orderItemId,
              orderItemAttributeId,
              updateData
            ),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      let orderId;
      let orderItemId;
      let orderItemAttributeId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          return instance.createItemAttribute(orderId, orderItemId, itemAttributeData);
        })
        .then((result) => {
          orderItemAttributeId = result.id;
          return instance.updateItemAttributeById(
            orderId,
            orderItemId,
            orderItemAttributeId,
            updateData
          );
        })
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
      const id = 99999999999999999;
      instance.updateItemAttributeById(id, id, id, {})
        .then(() => {
          assert.notOk('Update');
          done();
        })
        .catch(() => {
          assert.ok('Update');
          done();
        });
    });
  });

  describe('#updateItemById', () => {
    // Valid update data.
    const updateData = { name: 'Size' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateItemById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.updateItemById('test', 1, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing order item ID', () => {
      const sandbox = () => instance.updateItemById(1, null, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order item ID', () => {
      const sandbox = () => instance.updateItemById(1, 'test', updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.updateItemById(1, null);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.updateItemById(1, 'test', {});
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let orderItemId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => {
          orderItemId = result.id;
          assert.instanceOf(
            instance.updateItemById(orderId, orderItemId, updateData),
            Promise
          );
        });
    });

    it('returns a promise', (done) => {
      let orderId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createItem(orderId, itemData);
        })
        .then((result) => instance.updateItemById(orderId, result.id, updateData))
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

  describe('#updateStatus', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateStatus();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.updateStatus(null, statusData);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.updateStatus(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.updateStatus(1, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.updateStatus(result.id, statusData), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.updateStatus(result.id, statusData))
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
      instance.updateStatus(99999999999, statusData)
        .then(() => {
          assert.notOk('Update');
          done();
        })
        .catch(() => {
          assert.ok('Update');
          done();
        });
    });
  });

  describe('#updateTotalById', () => {
    // Valid update data.
    const updateData = { title: 'Tax' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateTotalById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.updateTotalById(null, 1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing total ID', () => {
      const sandbox = () => instance.updateTotalById(1, null, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid total ID', () => {
      const sandbox = () => instance.updateTotalById(1, 'test', 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.updateTotalById(1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid data', () => {
      const sandbox = () => instance.updateTotalById(1, 1, 'test');
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      let orderId;
      let totalId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => {
          totalId = result.id;
          assert.instanceOf(instance.updateTotalById(orderId, totalId, updateData), Promise);
        });
    });

    it('resolves the promise', (done) => {
      let orderId;

      instance
        .create(data)
        .then((result) => {
          orderId = result.id;
          return instance.createTotal(orderId, totalData);
        })
        .then((result) => instance.updateTotalById(orderId, result.id, updateData))
        .then(() => {
          assert.ok('Update');
          done();
        })
        .catch(() => {
          assert.notOk('Update');
          done();
        });
    });

    it('resolves the promise', (done) => {
      const id = 9999999999999999999;

      instance.updateTotalById(id, id, {})
        .then(() => {
          assert.notOk('Update');
          done();
        })
        .catch(() => {
          assert.ok('Update');
          done();
        });
    });
  });

  describe('#updateById', () => {
    // Valid update data.
    const updateData = { comment: 'This is my new comment!' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateById();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid order ID', () => {
      const sandbox = () => instance.updateById('test');
      assert.throws(sandbox, Error);
    });

    it('throws error on missing data', () => {
      const sandbox = () => instance.updateById(1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invbalid data', () => {
      const sandbox = () => instance.updateById(1, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.updateById(result.id, updateData), Promise));
    });

    it('resolves the promise', (done) => {
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
  });
});
