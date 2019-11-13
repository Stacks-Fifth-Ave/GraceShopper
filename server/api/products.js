const router = require('express').Router();
const {Product} = require('../db/models');
const {isAdminMiddleware, isCurrentUserMiddleware} = require('../middleware');

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

router.post('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const newProductInfo = req.body;
    const newProduct = await Product.create(newProductInfo);
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
});

router.put('/:productId', isAdminMiddleware, async (req, res, next) => {
  try {
    const curProductId = req.params.productId;
    const curProduct = await Product.findByPk(curProductId);
    const updatedInfo = req.body;
    const updatedProduct = await curProduct.update(updatedInfo);
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', isAdminMiddleware, async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.destroy({
      where: {id: productId}
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
