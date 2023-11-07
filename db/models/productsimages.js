'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const productsImagesInit = (sequelize, DataTypes) => {
  class ProductsImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsImages.init({
    url: DataTypes.TEXT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductsImages',
    freezeTableName: true
  });
  return ProductsImages;
};

module.exports = productsImagesInit(connection, DataTypes)