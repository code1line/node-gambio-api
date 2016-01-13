const expect = require('chai').expect;
const extend = require('extend');

const CredentialsValidator = require('../lib/CredentialsValidator');
const demoCredentials = require('../lib/demo/credentials');

describe('CredentialsValidator', () => {
  describe('Credentials object', () => {
    it('should work when valid credentials has been passed', () => {
      const func = () => {
        const validator = new CredentialsValidator(demoCredentials);
        validator.validate();
      };
      expect(func).not.to.throw(Error);
    });

    it('should throw error on missing credentials', () => {
      const func = () => {
        const validator = new CredentialsValidator();
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of credentials', () => {
      const func = () => {
        const validator = new CredentialsValidator('thisIsAString');
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on empty credentials object', () => {
      const func = () => {
        const credentials = {};
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });

  describe('URL', () => {
    it('should throw error on missing URL', () => {
      const func = () => {
        const credentials = {
          user: demoCredentials.user,
          pass: demoCredentials.pass,
        };
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, { url: 123 });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong format of URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          url: 'htp:)/"§?9812ß39.com/(212)"',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should work with "http" URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          url: 'http://extrashop.net/subfolder',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).not.to.throw(Error);
    });

    it('should work with "https" URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          url: 'https://extrashop.net/subfolder',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).not.to.throw(Error);
    });

    it('throw error on "ftp" URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          url: 'ftp://extrashop.net/subfolder',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('throw error on empty URL', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          url: '',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });

  describe('User', () => {
    it('should throw error on missing user', () => {
      const func = () => {
        const credentials = {
          url: demoCredentials.url,
          pass: demoCredentials.pass,
        };
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of user', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          user: 123,
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on empty user', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          user: '',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });

  describe('Password', () => {
    it('should throw error on missing password', () => {
      const func = () => {
        const credentials = {
          url: demoCredentials.url,
          user: demoCredentials.user,
        };
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on wrong type of password', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          pass: 123,
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });

    it('should throw error on empty password', () => {
      const func = () => {
        const credentials = extend(true, {}, demoCredentials, {
          pass: '',
        });
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });
});
