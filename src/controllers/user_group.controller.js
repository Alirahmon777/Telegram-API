import { Group, User_Group, Users } from "../models/index.js";

class UserGroupController {
  async ADD_USER_GROUP(req, res) {
    try {
      const { user_id, group_id, is_admin } = req.body;

      const userCheck = await Users.findOne({ where: { id: user_id } });
      const groupCheck = await Group.findOne({ where: { id: group_id } });

      if (!userCheck || !groupCheck) {
        return res
          .status(400)
          .json({ error: `Failed! User or Group Not Found!` });
      }

      const connectedData = await User_Group.create({
        user_id,
        group_id,
        is_admin,
      });

      res.status(201).json({ data: connectedData });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new UserGroupController();
