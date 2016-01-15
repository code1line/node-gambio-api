const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const NoArgumentError = require('../lib/error/NoArgumentError');

describe('NoArgumentError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new NoArgumentError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new NoArgumentError(message);
    expect(error.message).to.equal(message);
  });
});
