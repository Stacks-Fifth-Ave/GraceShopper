const Sequelize = require('sequelize');
const db = require('../db');

const CartProduct = db.define('cart', {
  quantity: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
});

module.exports = CartProduct;
