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
  if (req.user.id === +req.params.userId || req.user.isAdmin) {
    next();
  } else {
    const error = new Error('Unauthorized request');
    error.status = 401;
    next(error);
  }
};

module.exports = {
  isAdminMiddleware,
  isCurrentUserMiddleware
};
