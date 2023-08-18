import { sq } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Group_Message = sq.define(
  "group_messages",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true, underscored: true },
);
