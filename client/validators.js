const emailValidator = emailAdd => {
  if (emailAdd.includes('@')) {
    return true;
  }

  return false;
};

module.exports = {
  emailValidator
};
