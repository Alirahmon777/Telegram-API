import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";
import { Users } from "./Users.js";

export const Group = sq.define(
  "groups",
  {
    group_name: {
      type: DataTypes.STRING(98),
      allowNull: false,
    },

    group_link: {
      type: DataTypes.STRING,
      unique: true,
    },

    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: Users,
        key: "id",
      },
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
