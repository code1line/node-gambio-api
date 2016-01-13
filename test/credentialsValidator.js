const expect = require('chai').expect;

const CredentialsValidator = require('../lib/CredentialsValidator');
const demoCredentials = require('../lib/demo/credentials');

describe('CredentialsValidator', () => {
  describe('With demo credentials', () => {
    it('should work when a valid credentials has been passed', () => {
      const func = () => {
        const validator = new CredentialsValidator(demoCredentials);
        validator.validate();
      };
      expect(func).not.to.throw(Error);
    });
  });

  describe('With invalid credentials', () => {
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
  });

  describe('With invalid URL', () => {
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
        const credentials = demoCredentials;
        demoCredentials.url = 123;
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });

  describe('With invalid user', () => {
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
        const credentials = demoCredentials;
        demoCredentials.user = 123;
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });

  describe('With invalid password', () => {
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
        const credentials = demoCredentials;
        demoCredentials.password = 123;
        const validator = new CredentialsValidator(credentials);
        validator.validate();
      };
      expect(func).to.throw(Error);
    });
  });
});
