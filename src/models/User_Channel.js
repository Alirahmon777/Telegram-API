import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";
import { Users } from "./Users.js";
import { Channel } from "./Channel.js";

export const User_Channel = sq.define(
  "user_channel",
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
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      references: {
        model: Channel,
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
