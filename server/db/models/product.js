const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  //  stored in cents
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;
