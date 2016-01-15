const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const AuthenticationError = require('../lib/error/AuthenticationError');

describe('AuthenticationError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new AuthenticationError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new AuthenticationError(message);
    expect(error.message).to.equal(message);
  });
});
