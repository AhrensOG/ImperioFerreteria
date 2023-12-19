'use strict';
const { Model, DataTypes, BOOLEAN } = require('sequelize');
const connection = require('./index')

const orderInit = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    status: DataTypes.ENUM('Shopping', 'Pending', 'Paid', 'Cancel'),
    totalPrice: DataTypes.DECIMAL(10, 2),
    delivery: DataTypes.BOOLEAN,
    orderReceiver: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    receiverPhone: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true
  });
  return Order;
};

module.exports = orderInit(connection, DataTypes)