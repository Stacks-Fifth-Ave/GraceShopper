const router = require('express').Router();
const {Cart, User, Product, CartProduct} = require('../db/models');
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
      },
      include: [
        {
          model: Product
        }
      ]
    });
    const products = currentCart.products.map(product => {
      const newProd = {};
      newProd.info = {
        id: product.id,
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price
      };
      newProd.quantity = product.CartProduct.quantity;

      return newProd;
    });
    const newCart = {};
    newCart.id = req.params.userId;
    newCart.completed = false;
    newCart.products = products;

    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

router.get(
  '/orders/:userId',
  isCurrentUserMiddleware,
  async (req, res, next) => {
    try {
      const orders = await Cart.findAll({
        include: [
          {
            model: Product
          }
        ],
        where: {
          userId: req.params.userId,
          completed: true
        }
      });
      res.json(orders);
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
        },
        include: [
          {
            model: Product
          }
        ]
      });
      const product = await Product.findByPk(productId);
      const productCart = currentCart.products.filter(
        product => product.id === productId
      )[0];
      if (productCart) {
        productCart.CartProduct.quantity++;
        await productCart.CartProduct.save();
      } else {
        await currentCart.addProduct(product);
      }
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
        },
        include: [
          {
            model: Product
          }
        ]
      });
      const product = await Product.findByPk(productId);
      currentCart.products.map(prod => console.log(prod.id, productId));
      const productCart = currentCart.products.filter(
        product => product.id === productId
      )[0];
      if (productCart) {
        if (productCart.CartProduct.quantity === 1) {
          currentCart.removeProduct(product);
        } else {
          productCart.CartProduct.quantity--;
          await productCart.CartProduct.save();
        }
      }
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
