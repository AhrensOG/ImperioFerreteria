"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("./index");

const businessInit = (sequelize, DataTypes) => {
    class Business extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Business.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            url: { type: DataTypes.TEXT, allowNull: false },
            whatsAppLink: DataTypes.TEXT,
            instagramLink: DataTypes.TEXT,
            facebookLink: DataTypes.TEXT,
            locationLink: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Business",
            freezeTableName: true,
        }
    );
    return Business;
};

module.exports = businessInit(connection, DataTypes);
