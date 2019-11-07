const {expect} = require('chai');
const {centsToDollarString} = require('./formatters');

describe('cent to dollar string', () => {
  it('is a function', () => {
    expect(centsToDollarString).to.be.a('function');
  });
  it('returns a string', () => {
    expect(centsToDollarString(0)).is.a('string');
  });
  it('return string contains a dollar sign if dollar sign provided', () => {
    expect(centsToDollarString(100, '$')).deep.equals('$1.00');
  });
  it('return string contains a period at index -3', () => {
    expect(centsToDollarString(100)).deep.equals('1.00');
  });
  it('works for the maximum amount of cents', () => {
    expect(centsToDollarString(Number.MAX_SAFE_INTEGER)).deep.equals(
      '90071992547409.91'
    );
  });
  it('works with negative input', () => {
    expect(centsToDollarString(-12345)).deep.equals('-123.45');
  });
  it(
    'works with fewer than two digits and adds a leading zero before' +
      'decimal point',
    () => {
      expect(centsToDollarString(12)).deep.equals('0.12');
      expect(centsToDollarString(7)).deep.equals('0.07');
      expect(centsToDollarString(-7)).deep.equals('-0.07');
    }
  );
  it('works with 0', () => {
    expect(centsToDollarString(0)).deep.equals('0.00');
  });
  it('negative 0 return positive 0.00', () => {
    expect(centsToDollarString(-0)).deep.equals('0.00');
  });
});
