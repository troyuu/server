const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderCheckout = sequelize.define(
  "OrderCheckout",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_userid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    product_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    product_price: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    mode_payment: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "order_checkout",
    timestamps: false,
  }
);

module.exports = OrderCheckout;