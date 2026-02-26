const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductCategory = sequelize.define(
  "ProductCategory",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
     category_name: {
      type: DataTypes.STRING,
      allowNull: true,
},
  },
  {
    tableName: "product_category",
    timestamps: false,
  }
);

module.exports = ProductCategory;