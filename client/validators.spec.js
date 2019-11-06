const {expect} = require('chai');
const {emailValidator} = require('./validators');

describe('email validator', () => {
  it('is a function', () => {
    expect(emailValidator).to.be.a('function');
  });
  it('returns a boolean', () => {
    expect(emailValidator('')).is.a('boolean');
  });
  it('returns false if input does not contain an at sign (@)', () => {
    expect(emailValidator('randomstring')).deep.equals('false');
  });
});
