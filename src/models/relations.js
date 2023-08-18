import {
  Channel,
  Channel_Message,
  Group,
  Group_Message,
  Users,
} from "./index.js";
import { sq } from "../db/db.js";
import { User_Group } from "./User_Group.js";
import { User_Channel } from "./User_Channel.js";

export const relation = async () => {
  try {
    await sq.sync();

    Users.belongsToMany(Group, {
      through: { model: User_Group, unique: false },
      foreignKey: "user_id",
    });

    Group.belongsToMany(Users, {
      through: { model: User_Group, unique: false },
      foreignKey: "group_id",
    });

    Users.belongsToMany(Channel, {
      through: { model: User_Channel, unique: false },
      foreignKey: "user_id",
    });
    Channel.belongsToMany(Users, {
      through: { model: User_Channel, unique: false },
      foreignKey: "channel_id",
    });

    Users.hasMany(Group_Message);
    Group.hasMany(Group_Message);

    Users.hasMany(Channel_Message);
    Channel.hasMany(Channel_Message);
  } catch (e) {
    console.log(e.message);
    return e.message;
  }
};

export const modelSync = async () => {
  try {
    await sq.sync();
    console.log("Models synced with the database");
  } catch (e) {
    console.error("Error syncing models:", e.message);
  }
};
