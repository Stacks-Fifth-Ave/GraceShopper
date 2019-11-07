const DOT_FROM_RIGHT = 2; // index of . from left
const DEFAULT_CURRENCY = '$';

const centsToDollarString = (cents, symbol) => {
  let cStr = cents.toString();
  let isNegative = false;

  if (cents < 0) {
    // remove minus sign:
    cStr = cStr.slice(1);
    // only set isNegative flag if not 0
    if (cents !== 0) {
      isNegative = true;
    }
  }

  if (cStr.length > DOT_FROM_RIGHT) {
    const cArr = cStr.split('');

    cArr.splice(-DOT_FROM_RIGHT, 0, '.');
    cStr = cArr.join('');
  } else if (cStr.length === DOT_FROM_RIGHT) {
    cStr = '0.' + cStr;
  } else if (cStr.length === DOT_FROM_RIGHT - 1) {
    cStr = '0.0' + cStr;
  } else {
    cStr = '0.00';
  }

  // add minus sign back in if necessary
  if (isNegative) {
    cStr = '-' + cStr;
  }

  // if sign is provided, add it beginning
  if (typeof symbol !== 'undefined') {
    cStr = symbol + cStr;
  }

  return cStr;
};

module.exports = {
  centsToDollarString,
  DEFAULT_CURRENCY
};
