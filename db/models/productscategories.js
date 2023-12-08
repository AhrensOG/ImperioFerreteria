'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const initProductsCategories = (sequelize, DataTypes) => {
  class ProductsCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsCategories.init({}, {
    sequelize,
    modelName: 'ProductsCategories',
    freezeTableName: true
  });
  return ProductsCategories;
};

module.exports = initProductsCategories(connection, DataTypes)