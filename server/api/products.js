const router = require('express').Router();
const {Product} = require('../db/models');

const NO_PRODUCTS = 'no products found';
const PRODUCT_NOT_FOUND = 'product not found';
const ID_NO = '\nid #: ';

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();

    if (products.length < 1) {
      return res.send(NO_PRODUCTS);
    }

    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    let id = req.params.productId;
    const product = await Product.findByPk(id);

    if (product !== null) {
      res.json(product);
    }

    res.send(PRODUCT_NOT_FOUND + ID_NO + id);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
