import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Channel_Message = sq.define(
  "channel_messages",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true },
);
