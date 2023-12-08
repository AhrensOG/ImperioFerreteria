'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const categoriesInit = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categories.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Categories',
    freezeTableName: true
  });
  return Categories;
};

module.exports = categoriesInit(connection, DataTypes)