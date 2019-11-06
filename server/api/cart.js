const router = require('express').Router();
const {Cart} = require('../db/models');

//in the case of a guest, what is the route for the cart

//router that returns current cart based on userId
router.get('/:userId', async (req, res, next) => {
  try {
    const currentCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      }
    });
    res.json(currentCart);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
