import { Channel, User_Channel, Users } from "../models/index.js";

class UserChannelController {
  async ADD_USER_CHANNEL(req, res) {
    try {
      const { user_id, channel_id, is_admin } = req.body;

      const userCheck = await Users.findOne({ where: { id: user_id } });
      const channelCheck = await Channel.findOne({ where: { id: channel_id } });

      if (!userCheck || !channelCheck) {
        return res
          .status(400)
          .json({ error: `Failed! User or Channel Not Found!` });
      }

      const connectedData = await User_Channel.create({
        user_id,
        channel_id,
        is_admin,
      });

      res.status(201).json({ data: connectedData });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new UserChannelController();
