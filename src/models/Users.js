import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Users = sq.define(
  "users",
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Field cannot be empty.",
        },
        len: {
          args: [2, 56],
          msg: "String length is not in this range, min=2 max=56 char",
        },
      },
    },

    second_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Field cannot be empty.",
        },
        len: {
          args: [2, 56],
          msg: "String length is not in this range, min=2 max=56 char",
        },
      },
    },

    description: {
      type: DataTypes.TEXT,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
    },

    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    avatarka: {
      type: DataTypes.STRING,
    },

    filename: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    timestamps: true,
    deletedAt: true,
  },
);
