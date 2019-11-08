const router = require('express').Router();
const {Cart, User} = require('../db/models');
const {isAdminMiddleware, isCurrentUserMiddleware} = require('../middleware');
//in the case of a guest, what is the route for the cart?

//add isAdmin middleware to see all carts
router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      attributes: ['id', 'completed', 'userId']
    });
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', isCurrentUserMiddleware, async (req, res, next) => {
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

router.get(
  '/cartHistory/:userId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const cartHistory = await Cart.findAll({
        where: {
          userId: req.params.userId,
          completed: true
        }
      });
      res.json(cartHistory);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/:userId', isCurrentUserMiddleware, async (req, res, next) => {
  try {
    const newCart = await Cart.create({
      userId: req.params.userId
    });

    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.put(
  '/addProduct/:userId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const productId = req.body.productId;
      const currentCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          completed: false
        }
      });

      currentCart.addProduct(productId);
      res.sendStatus(201);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

router.put(
  '/removeProduct/:userId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const productId = req.body.productId;
      const currentCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          completed: false
        }
      });

      currentCart.removeProduct(productId);
      res.sendStatus(204);
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  }
);

router.delete(
  '/clearCart/:userId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const currentCart = await Cart.findOne({
        where: {
          userId: req.params.userId,
          completed: false
        }
      });

      await currentCart.update({
        completed: true
      });

      await Cart.create({userId: req.params.userId});
      res.send('cleared');
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }
);

module.exports = router;
