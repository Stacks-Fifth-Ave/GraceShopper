//custom middleware

const isAdminMiddleware = (req, res, next) => {
  const currentUser = req.user;
  if (currentUser && currentUser.isAdmin) {
    next();
  } else {
    const error = new Error('Unauthorized request');
    error.status = 401;
    next(error);
  }
};
const isCurrentUserMiddleware = (req, res, next) => {
  const currentUser = req.user;
  const urlId = req.params.userId;
  if (currentUser.id !== +req.params.userId) {
    const error = new Error('Unauthorized request');
    error.status = 401;
    next(error);
  } else {
    next();
  }
};

module.exports = {
  isAdminMiddleware,
  isCurrentUserMiddleware
};
