'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const productstInit = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    title: DataTypes.STRING,
    firstImage: DataTypes.TEXT,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
    freezeTableName: true
  });
  return Products;
};

module.exports = productstInit(connection, DataTypes)