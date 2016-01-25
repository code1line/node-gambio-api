const expect = require('chai').expect;

const ExtendableError = require('../lib/error/ExtendableError');
const RequestError = require('../lib/error/RequestError');

describe('RequestError', () => {
  it('should be instance of ExtendableError object', () => {
    const error = new RequestError('Test error');
    expect(error).to.be.instanceOf(ExtendableError);
  });

  it('should contain the same error message as provided', () => {
    const message = 'Fail';
    const error = new RequestError(message);
    expect(error.message).to.equal(message);
  });
});
