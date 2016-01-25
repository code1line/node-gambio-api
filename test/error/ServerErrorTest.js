const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const ServerError = require('../lib/error/ServerError');

describe('ServerError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new ServerError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new ServerError(message);
    expect(error.message).to.equal(message);
  });
});
