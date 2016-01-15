const expect = require('chai').expect;

const GambioApi = require('../.');
const demoCredentials = require('../demo/credentials');

describe('Instantiation', () => {
  it('should throw error on instantiating without credentials', () => {
    const func = () => new GambioApi();
    expect(func).to.throw(Error);
  });

  it('should throw error on instantiating with invalid credentials', () => {
    const func = () => new GambioApi({ a: 'b' });
    expect(func).to.throw(Error);
  });

  it('should work on instantiating with valid credentials', () => {
    const func = () => new GambioApi(demoCredentials);
    expect(func).not.to.throw(Error);
  });
});
