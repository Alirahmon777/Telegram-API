import {
  Channel,
  Channel_Message,
  User_Channel,
  Users,
} from "../models/index.js";
import { APP } from "../config/config.js";

class ChannelController {
  async GET_CHANNELS(req, res) {
    try {
      const channels = await Channel.findAll({ include: Users });

      res.status(200).json({ data: channels });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async GET_CHANNEL(req, res) {
    try {
      const { id } = req.params;

      const channel = await Channel.findOne({
        where: { id },
        include: [Users, Channel_Message],
      });

      if (!channel) {
        return res.status(400).json({ error: "Not Found!" });
      }

      res.status(200).json({ data: channel });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async ADD_CHANNEL(req, res) {
    try {
      let filename = null;
      const { channel_name, channel_link, creator_id } = req.body;

      if (req.file) {
        filename = req.file.filename;
      }

      const userCheck = await Users.findOne({ where: { id: creator_id } });

      if (!userCheck) {
        return res
          .status(400)
          .json({ error: `User with this id: ${creator_id} not found!` });
      }

      const imagePath = `http://${APP["HOST"]}:${APP["PORT"]}/api/media/${filename}`;

      const channel = await Channel.create({
        channel_link,
        channel_name,
        creator_id,
        avatarka: filename ? imagePath : filename,
        filename,
      });

      await User_Channel.create({
        user_id: creator_id,
        channel_id: channel?.id,
        is_admin: true,
      });

      res
        .status(201)
        .json({ data: channel, msg: "channel was created succesfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new ChannelController();
