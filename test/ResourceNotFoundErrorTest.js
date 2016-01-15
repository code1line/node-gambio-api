const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const ResourceNotFoundError = require('../lib/error/ResourceNotFoundError');

describe('ResourceNotFoundError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new ResourceNotFoundError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new ResourceNotFoundError(message);
    expect(error.message).to.equal(message);
  });
});
