const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const RegisterUser = sequelize.define(
  "RegisterUser",
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
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: true,
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
  },
  {
    tableName: "register_user",
    timestamps: false,
  }
);

module.exports = RegisterUser;