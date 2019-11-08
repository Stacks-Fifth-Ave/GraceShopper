const PW_MAX_L = 16;
const PW_MIN_L = 8;

// front-end email address validator -- uses specification found at
// 'https://www.mailboxvalidator.com/resources/articles/acceptable-email-address
// -syntax-rfc/'

// figured it would take just as long to learn RegEx well enough to validate an
// email address instead of simply using JavaScript functions or loops to
// accomplish the same thing -- each failing conditional has a comment

const emailValidator = emailAdd => {
  const validLocalChars = {};
  const validDnsLabelChars = {};

  let local = '';
  let domain = '';
  let atIndex = null;
  let dotIndex = null;
  let domainArr = [];
  let tld = '';

  // populate valid characters:
  // numeric is valid in both local and DNS label:
  // (by ASCII code)
  for (let i = 48; i <= 57; i++) {
    addCharToObject(i, validLocalChars);
    addCharToObject(i, validDnsLabelChars);
  }

  // all alphabetic characters are valid in both local and DNS label
  for (let i = 65; i <= 90; i++) {
    addCharToObject(i, validLocalChars);
    addCharToObject(i + 32, validLocalChars);
    addCharToObject(i, validDnsLabelChars);
    addCharToObject(i + 32, validDnsLabelChars);
  }

  // DNS labels can have a hypen:
  validDnsLabelChars['-'] = '-';

  // local part has a bunch of special characters I rarely or never see in
  // actual email addresses:
  validLocalChars['!'] = '!';
  validLocalChars['#'] = '#';
  validLocalChars.$ = '$';
  validLocalChars['%'] = '%';
  validLocalChars['&'] = '&';
  validLocalChars["'"] = "'";
  validLocalChars['*'] = '*';
  validLocalChars['+'] = '+';
  validLocalChars['-'] = '-';
  validLocalChars['/'] = '/';
  validLocalChars['='] = '=';
  validLocalChars['?'] = '?';
  validLocalChars['^'] = '^';
  validLocalChars._ = '_';
  validLocalChars['`'] = '`';
  validLocalChars['.'] = '.';
  validLocalChars['{'] = '}';
  validLocalChars['|'] = '|';
  validLocalChars['}'] = '}';
  validLocalChars['~'] = '~';
  // done populating valid character objects

  // if emailAdd does not contain an @ symbol:
  if (!emailAdd.includes('@')) {
    return false;
  }

  atIndex = emailAdd.indexOf('@');
  local = emailAdd.slice(0, atIndex);
  // if local is not between 0 and 64 characters long, exclusive:
  if (local.length > 63 || local.length < 1) {
    return false;
  }

  domain = emailAdd.slice(atIndex + 1);
  // if domain is not between 2 and 256 characters long, exclusive:
  if (domain.length > 255 || domain.length < 3) {
    return false;
  }

  domainArr = domain.split('.');
  // if domainArr has a length of less than two, that means there is no period
  // in the domain, which is a required character:
  if (domainArr.length < 2) {
    return false;
  }

  // if any DNS label is not between 0 and 64 characters long, exclusive,
  // and while I'm looping through them I might as well make sure there are no
  // invalid characters -- also while hyphens are permitted they cannot be the
  // first or last character of a label
  for (let dnsLabel of domainArr) {
    if (dnsLabel.length > 63 || dnsLabel.length < 1) {
      return false;
    }

    for (let ch of dnsLabel) {
      if (validDnsLabelChars[ch] === undefined) {
        return false;
      }
    }

    if (dnsLabel[0] === '-' || dnsLabel[dnsLabel.length - 1] === '-') {
      return false;
    }
  }

  tld = domainArr[domainArr.length - 1];
  // if the top level domain is numeric:
  if (!isNaN(tld)) {
    return false;
  }

  // if local part contains an invalid character:
  for (let ch of local) {
    if (validLocalChars[ch] === undefined) {
      return false;
    }
  }

  // if local part starts with a period or ends with a period:
  if (local[0] === '.' || local[local.length - 1] === '.') {
    return false;
  }

  // if local part has two (or more) periods in a row:
  for (let i = 2; i < local.length - 1; i++) {
    if (local[i - 1] === '.' && local[i] === '.') {
      return false;
    }
  }

  return true;
};

// helper for email validator -- takes a charcode and object and inserts
// actual character as both key and value
const addCharToObject = (chCode, obj) => {
  let ch = String.fromCharCode(chCode);

  obj[ch] = ch;
};

// front-end password validator:
// makes sure a password is between 7-17 characters long, exclusive, that it
// has one numeric character, one special character, and does not contain any
// patterns from the local part of the email address

const passwordValidator = (password, emailAdd) => {
  let numFlag = false;

  console.log('password:', password);

  if (password.length < PW_MIN_L || password.length > PW_MAX_L) {
    return false;
  }

  for (let ch of password) {
    if (!isNaN(parseInt(ch))) {
      numFlag = true;
      break;
    }
  }

  if (!numFlag) {
    return false;
  }

  return true;
};

module.exports = {
  emailValidator,
  passwordValidator
};
