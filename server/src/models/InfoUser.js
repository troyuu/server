const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const InfoUser = sequelize.define(
  "InfoUser",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    f_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    l_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    age: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "info_user",
    timestamps: false,
  }
);

module.exports = InfoUser;