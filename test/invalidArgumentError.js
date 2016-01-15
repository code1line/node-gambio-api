const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const InvalidArgumentError = require('../lib/error/InvalidArgumentError');

describe('InvalidArgumentError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new InvalidArgumentError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new InvalidArgumentError(message);
    expect(error.message).to.equal(message);
  });
});
