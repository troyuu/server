const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductInfo = sequelize.define(
  "ProductInfo",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_category: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "product_info",
    timestamps: false,
  }
);

module.exports = ProductInfo;