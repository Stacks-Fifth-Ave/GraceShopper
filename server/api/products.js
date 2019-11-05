const router = require('express').Router();
const {Product} = require('../db/models');

const NO_PRODUCTS = 'No products found.';
const PRODUCT_NOT_FOUND = 'Product not found. ID #: ';

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (products.length < 1) {
      return res.status(404).send(NO_PRODUCTS);
    }
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    let productId = req.params.productId;
    const product = await Product.findByPk(productId);

    if (product === null) {
      return res.status(404).send(PRODUCT_NOT_FOUND + productId);
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
