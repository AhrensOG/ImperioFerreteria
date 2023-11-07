'use strict';
const { Model, DataTypes } = require('sequelize');
const connection = require('./index')

const cartInit = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    status: DataTypes.ENUM('Shopping', 'Pending', 'Paid', 'Cancel'),
    totalPrice: DataTypes.DECIMAL(10, 2),
    lifeTime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Cart',
    freezeTableName: true
  });
  return Cart;
};

module.exports = cartInit(connection, DataTypes)