const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LoginUser = sequelize.define(
  "LoginUser",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "login_user",
    timestamps: false,
  }
);

module.exports = LoginUser;