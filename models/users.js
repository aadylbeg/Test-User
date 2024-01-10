"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate() {}
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
      };
    }
  }
  Users.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
      },
      sex: {
        type: DataTypes.ENUM("male", "female"),
      },
    },
    {
      sequelize,
      underscored: true,
      tableName: "users",
      modelName: "Users",
    }
  );
  return Users;
};
