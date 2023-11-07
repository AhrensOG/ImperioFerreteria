'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const initProductsCart = (sequelize, DataTypes) => {
  class ProductsCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsCart.init({
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductsCart',
    freezeTableName: true
  });
  return ProductsCart;
};

module.exports = initProductsCart(connection, DataTypes)