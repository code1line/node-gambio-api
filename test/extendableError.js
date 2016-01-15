const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');

describe('ExtendableError', () => {
  it('should be instance of native error object', () => {
    const error = new ExtendableError('Test error');
    expect(error).to.be.instanceOf(Error);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new ExtendableError(message);
    expect(error.message).to.equal(message);
  });
});
