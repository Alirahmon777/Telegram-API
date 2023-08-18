import { Channel, Group, User_Channel, User_Group } from "../models/index.js";

class BasicMiddleware {
  CHECK_ID(req, res, next) {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid Request Params" });
    }

    next();
  }

  async CHECK_LINK(req, res, next) {
    const { channel_link, group_link, user_id, channel_id, group_id } =
      req.body;

    let data;

    if (channel_link) data = await Channel.findOne({ where: { channel_link } });

    if (group_link) data = await Group.findOne({ where: { group_link } });

    if (user_id && channel_id)
      data = await User_Channel.findOne({ where: { user_id, channel_id } });

    if (user_id && group_id)
      data = await User_Group.findOne({ where: { user_id, group_id } });

    if (data) {
      return res.status(409).json({ error: "Already exists!" });
    }

    next();
  }
}

export default new BasicMiddleware();
