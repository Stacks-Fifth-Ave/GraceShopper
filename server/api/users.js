const router = require('express').Router();
const {User} = require('../db/models');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [id, email]
    });

    if (users.length < 1) {
      res.send('no users at the moment');
    }

    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
