import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";
import { Users } from "./Users.js";
import { Group } from "./Group.js";

export const User_Group = sq.define(
  "user_group",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: Users,
        key: "id",
      },
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: Group,
        key: "id",
      },
    },

    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
  },
);
