const router = require('express').Router();
const {User} = require('../db/models');

const NO_USERS = 'No users found.';
const USER_NOT_FOUND = 'User not found. Id #: ';

router.get('/', async (req, res, next) => {
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

router.get('/:userId', async (req, res, next) => {
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

module.exports = router;
