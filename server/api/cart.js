const router = require('express').Router();
const {Cart} = require('../db/models');

//in the case of a guest, what is the route for the cart?

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
router.put('/addProduct/:userId', async (req, res, next) => {
  try {
    const product = req.body.product;
    const currentCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      }
    });
    currentCart.addProduct(product);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create();
    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.delete('/removeProduct/:userId', async (req, res, next) => {
  try {
    const product = req.body.product;
    const currentCart = await Cart.findOne({
      where: {
        userId: req.params.userId,
        completed: false
      }
    });
    currentCart.removeProduct(product);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
