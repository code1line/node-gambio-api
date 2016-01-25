const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const ClientError = require('../lib/error/ClientError');

describe('ClientError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new ClientError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new ClientError(message);
    expect(error.message).to.equal(message);
  });
});
