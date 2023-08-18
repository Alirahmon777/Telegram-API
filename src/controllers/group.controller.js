import { Group, Group_Message, User_Group, Users } from "../models/index.js";
import { APP } from "../config/config.js";

class GroupController {
  async GET_GROUPS(req, res) {
    try {
      const groups = await Group.findAll({ include: Users });

      res.status(200).json({ data: groups });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  async GET_GROUP(req, res) {
    try {
      const { id } = req.params;

      const group = await Group.findOne({
        where: { id },
        include: [Users, Group_Message],
      });

      if (!group) {
        return res.status(400).json({ error: "Group Not Found!" });
      }

      res.status(200).json({ data: group });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async ADD_GROUP(req, res) {
    try {
      let filename = null;

      if (req.file) {
        filename = req.file.filename;
      }

      const { group_name, group_link, creator_id } = req.body;
      const imagePath = `http://${APP["HOST"]}:${APP["PORT"]}/api/media/${filename}`;

      const group = await Group.create({
        group_name,
        group_link,
        creator_id,
        avatarka: filename ? imagePath : filename,
        filename,
      });

      await User_Group.create({
        user_id: creator_id,
        group_id: group?.id,
        is_admin: true,
      });

      res.status(201).json({ data: group });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new GroupController();
