const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  cartQuantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1,
    validate: {
      notEmpty: true,
    },
  },
});

Product.prototype.updateQuantity = async function (quantity) {
    this.quantity = await this.quantity - quantity;
    await this.save();
};

Product.prototype.addQuantity = async function (quantity) {
    this.quantity = await this.quantity + quantity;
    await this.save();
};

Product.prototype.updatePrice = async function (price) {
    this.price = await price;
    await this.save();
};


module.exports = Product;
