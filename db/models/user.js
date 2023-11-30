'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const userInit = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.TEXT,
      autoIncrement: false,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    profileImage: DataTypes.TEXT,
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};

module.exports = userInit(connection, DataTypes)