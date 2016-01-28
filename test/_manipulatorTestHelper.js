const expect = require('chai').expect;
const errors = require('common-errors');

/*eslint-disable */

/**
 * Test request manipulation methods.
 *
 * @param {Object}    options                 Options object.
 * @param {Object}    options.testedObject    Tested class instance.
 * @param {String}    options.methodName      Tested method.
 * @param {String[]}  options.limitedFields   Limited fields.
 * @param {String}    options.excludedField   Name of an excluded field.
 */
function testManipulatorMethods(options) {
  it('should throw ArgumentError on wrong sorting argument type', () => {
    const sandbox = () => options.testedObject[options.methodName](1);
    expect(sandbox).to.throw(errors.ArgumentError);
  });

  it('should throw ArgumentError on wrong limits argument type', () => {
    const sandbox = () => options.testedObject[options.methodName]({}, 1);
    expect(sandbox).to.throw(errors.ArgumentError);
  });

  it('should return a sorted result', (done) => {
    options.testedObject[options.methodName]({ id: 'desc' })
      .then((result) => {
        expect(result[0].id).to.be.above(result[1].id);
        done();
      });
  });

  it('should returned a minimized result', (done) => {
    options.testedObject[options.methodName](null, options.limitedFields)
      .then((result) => {
        expect(result[0]).to.not.have.key(options.excludedField);
        done();
      });
  });
}

/*eslint-enable */

module.exports = testManipulatorMethods;
