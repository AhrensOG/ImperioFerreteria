'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const initProductsOrder = (sequelize, DataTypes) => {
  class ProductsOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsOrder.init({
    productName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('Shopping', 'Pending', 'Paid', 'Cancel'),
      defaultValue: "Shopping"
    }
  }, {
    sequelize,
    modelName: 'ProductsOrder',
    freezeTableName: true
  });
  return ProductsOrder;
};

module.exports = initProductsOrder(connection, DataTypes)