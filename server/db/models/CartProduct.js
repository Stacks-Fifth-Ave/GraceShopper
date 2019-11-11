const Sequelize = require('sequelize');
const db = require('../db');

const CartProduct = db.define('CartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  priceAtPurchase: {
    type: Sequelize.INTEGER
  }
});

module.exports = CartProduct;
