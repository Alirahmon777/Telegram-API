import {
  Channel,
  Channel_Message,
  Group,
  Group_Message,
  User_Channel,
  User_Group,
  Users,
} from "../models/index.js";
import { GetTokenFromHeader, VerifyJwt } from "../utils/auth-helper.js";
import { DeleteFile, ExistsFile } from "../utils/filesystem.js";
import { join } from "path";

class UserController {
  async GET_USERS(req, res) {
    try {
      const { limit = 10, page = 1 } = req.query;

      const users = await Users.findAndCountAll({
        limit,
        offset: (page - 1) * limit,
      });

      users.totalCount = users.count;
      users.count = users.rows.length;

      res.status(200).json({ data: users });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async GET_USER(req, res) {
    try {
      const { token } = GetTokenFromHeader(req);
      const { limit = 10, page = 1 } = req.query;

      const startIndex = (page - 1) * +limit;
      const endIndex = startIndex + +limit;

      const { phone_number } = await VerifyJwt(token);

      const user = await Users.findOne({
        where: { phone_number },
        include: [Channel, Group],
      });

      if (!user) {
        return res.status(400).json({ error: "User Not Found" });
      }

      const totalCount =
        user.dataValues.groups.length + user.dataValues.channels.length;
      user.dataValues.allDatas = [
        ...user.toJSON().channels,
        ...user.toJSON().groups,
      ].slice(startIndex, endIndex);

      delete user.dataValues.groups;
      delete user.dataValues.channels;

      res.status(200).json({
        totalCount,
        count: user.dataValues.allDatas.length,
        currentPage: +page,
        data: user,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async DELETE_USERS(req, res) {
    try {
      const { id } = req.params;

      const user = await Users.findOne({
        where: {
          id,
        },
      });

      await Users.destroy({
        where: {
          id,
        },
        cascade: true,
      });

      if (ExistsFile(join("public", "users", user?.filename))) {
        DeleteFile(join("public", "users", user.filename));
      }

      res.status(200).json({ deletedData: user });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async ADD_MESSAGE(req, res) {
    try {
      const { content, user_id, group_id, channel_id } = req.body;

      if (group_id && channel_id) {
        return res.status(400).json({
          error: "You can only post to one location! (To Group or Channel)",
        });
      }

      if (group_id) {
        const useGroupCheck = await User_Group.findOne({
          where: { user_id, group_id },
        });

        if (!useGroupCheck) {
          return res.status(400).json({ error: `Not Found!` });
        }

        const connectedData = await Group_Message.create({
          content,
          userId: user_id,
          groupId: group_id,
        });

        return res.status(201).json({
          groupMessage: connectedData,
        });
      }

      if (channel_id) {
        const isAllowed = await User_Channel.findOne({
          where: { user_id, channel_id },
        });

        const isCreator = await Channel.findOne({
          where: { creator_id: user_id, id: channel_id },
        });

        if (!isAllowed && !isCreator) {
          return res.status(400).json({ error: "Not Found!" });
        }

        if (isCreator || isAllowed?.toJSON()?.is_admin) {
          const connectedData = await Channel_Message.create({
            content,
            userId: user_id,
            channelId: channel_id,
          });

          return res.status(201).json({ data: connectedData });
        }

        return res
          .status(403)
          .json({ error: "Forbidden!, you can't send message" });
      }

      res.status(400).json({ error: "Bad Request!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new UserController();
