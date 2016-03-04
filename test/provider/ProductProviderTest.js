import { assert } from 'chai';
import { random } from 'lodash';
import Promise from 'bluebird';
import ProductProvider from './../../lib/provider/ProductProvider';
import credentials from './../_credentials';
import apiUrl from './../_apiUrl';
import data from './../_fixtures/product';

describe('ProductProvider', () => {
  // Valid URL.
  const url = credentials.url + apiUrl;

  // Valid authentication object.
  const auth = { user: credentials.user, pass: credentials.pass };

  // Valid instance.
  const instance = new ProductProvider(url, auth);

  // Valid file path.
  const path = `${__dirname}/../../logo.png`;

  // Valid filename.
  const name = 'my_file.txt';

  describe('#changeCategoryLink', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.changeCategoryLink();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID', () => {
      const sandbox = () => instance.changeCategoryLink(1.232, 1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing old category ID', () => {
      const sandbox = () => instance.changeCategoryLink(1, null, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid old category ID', () => {
      const sandbox = () => instance.changeCategoryLink(1, 1.2, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing new category ID', () => {
      const sandbox = () => instance.changeCategoryLink(1, 1);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid new category ID', () => {
      const sandbox = () => instance.changeCategoryLink(1, 1, 1.2);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.changeCategoryLink(result.id, 1, 2), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.changeCategoryLink(result.id, 1, 2))
        .then(() => {
          assert.ok('Change');
          done();
        })
        .catch(() => {
          assert.notOk('Change');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .changeCategoryLink(99999999999, 1, 2)
        .then(() => {
          assert.notOk('Change');
          done();
        })
        .catch(() => {
          assert.ok('Change');
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
          assert.ok('Creation');
          done();
        })
        .catch(() => {
          assert.notOk('Creation');
          done();
        });
    });

    it('resolves the promise', (done) => {
      instance
        .create({})
        .then(() => {
          assert.notOk('Creation');
          done();
        })
        .catch(() => {
          assert.ok('Creation');
          done();
        });
    });
  });

  describe('#deleteImage', () => {
    // Non-existent file.
    const filename = 'this_file_does_not_exist.jpg';

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.deleteImage();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.deleteImage(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.deleteImage(filename), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .deleteImage(filename)
        .then(() => {
          assert.ok('Removal');
          done();
        })
        .catch(() => {
          assert.notOk('Removal');
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
        .deleteById(99999999999999999999999999)
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

  describe('#getCategoryLinks', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.getCategoryLinks();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.getCategoryLinks(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .create(data)
        .then((result) => assert.instanceOf(instance.getCategoryLinks(result.id), Promise));
    });

    it('resolves the promise', (done) => {
      instance
        .create(data)
        .then((result) => instance.getCategoryLinks(result.id))
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
        .getCategoryLinks(99999999999999999999)
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
        .getById(99999999999999999999999999999)
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

  describe('#renameImage', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.renameImage();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid argument', () => {
      const sandbox = () => instance.renameImage(1.232);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      instance
        .uploadImage(path, name)
        .then((result) => {
          assert.instanceOf(
            instance.renameImage(result.filename, `${random(1, 1000)}.txt`),
            Promise
          );
        });
    });

    it('resolves the promise', (done) => {
      instance
        .uploadImage(path, name)
        .then((result) => instance.renameImage(result.filename, `${random(1, 1000)}.txt`))
        .then(() => {
          assert.ok('Renaming');
          done();
        })
        .catch(() => {
          assert.notOk('Renaming');
          done();
        });
    });
  });

  describe('#updateById', () => {
    // Valid update data.
    const updateData = { productModel: 'newModel' };

    it('throws error on missing arguments', () => {
      const sandbox = () => instance.updateById();
      assert.throws(sandbox, Error);
    });

    it('throws error on missing ID', () => {
      const sandbox = () => instance.updateById(null, updateData);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid ID', () => {
      const sandbox = () => instance.updateById(1.23, updateData);
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
      instance
        .create(data)
        .then((result) => instance.updateById(result.id, updateData))
        .then(() => {
          assert.ok('Updating');
          done();
        })
        .catch(() => {
          assert.notOk('Updating');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .updateById(99999999999999999999999999999999999, updateData)
        .then(() => {
          assert.notOk('Updating');
          done();
        })
        .catch(() => {
          assert.ok('Updating');
          done();
        });
    });
  });

  describe('#uploadImage', () => {
    it('throws error on missing arguments', () => {
      const sandbox = () => instance.uploadImage();
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid path', () => {
      const sandbox = () => instance.uploadImage(1.232);
      assert.throws(sandbox, Error);
    });

    it('throws error on missing name', () => {
      const sandbox = () => instance.uploadImage(path);
      assert.throws(sandbox, Error);
    });

    it('throws error on invalid name', () => {
      const sandbox = () => instance.uploadImage(path, 1);
      assert.throws(sandbox, Error);
    });

    it('returns a promise', () => {
      assert.instanceOf(instance.uploadImage(path, name), Promise);
    });

    it('resolves the promise', (done) => {
      instance
        .uploadImage(path, name)
        .then(() => {
          assert.ok('Uploading');
          done();
        })
        .catch(() => {
          assert.notOk('Uploading');
          done();
        });
    });

    it('rejects the promise', (done) => {
      instance
        .uploadImage('asdasdas', name)
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
