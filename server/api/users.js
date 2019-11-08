const router = require('express').Router();
const {User} = require('../db/models');
const {isAdminMiddleware, isCurrentUserMiddleware} = require('../middleware');

const NO_USERS = 'No users found.';
const USER_NOT_FOUND = 'User not found. Id #: ';

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    });

    if (users.length < 1) {
      return res.status(404).send(NO_USERS);
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', isCurrentUserMiddleware, async (req, res, next) => {
  try {
    let userId = req.params.userId;
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email']
    });

    if (user === null) {
      return res.status(404).send(USER_NOT_FOUND + userId);
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
});
//user POST route to create a new user at '/signup' located in './index.js'

router.put('/:userId', async (req, res, next) => {
  try {
    const curUserId = req.params.userId;
    const curUser = await User.findByPk(curUserId);
    const updatedInfo = req.body;
    const updatedUser = await curUser.update(updatedInfo);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.destroy({
      where: {id: userId}
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
