import { Users } from "../models/Users.js";
import bcrypt from "bcrypt";
import { DB, APP } from "../config/config.js";
import { AuthHelper } from "../utils/auth-helper.js";
import { userChannelRoutes } from "../routes/index.js";
class AuthController {
  async SIGN_UP(req, res) {
    try {
      let filename;

      if (req.file) {
        filename = req.file.filename;
      }

      const {
        first_name,
        second_name,
        username,
        password,
        description,
        phone_number,
      } = req.body;

      const { AccessToken, RefreshToken } = AuthHelper(phone_number);
      const imagePath = `http://${APP["HOST"]}:${APP["PORT"]}/api/media/${filename}`;

      const user = await Users.create({
        first_name,
        second_name,
        username,
        description,
        phone_number,
        password: bcrypt.hashSync(password, 10),
        avatarka: filename ? imagePath : filename,
        filename,
      });
      res.status(201).json({
        message: "User was registered successfully!",
        tokens: { AccessToken, RefreshToken },
        data: user,
      });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  async SIGN_IN(req, res) {
    const { phone_number, password } = req.body;
    Users.findOne({
      where: {
        phone_number,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            AccessToken: null,
            message: "Invalid Password!",
          });
        }

        const { AccessToken, RefreshToken } = AuthHelper(phone_number);

        res.status(200).json({
          data: {
            ...user.toJSON(),
          },
          tokens: { AccessToken, RefreshToken },
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
}

export default new AuthController();
