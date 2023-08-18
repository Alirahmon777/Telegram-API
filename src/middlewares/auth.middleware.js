import { Users } from "../models/index.js";
import jwt from "jsonwebtoken";
import { APP } from "../config/config.js";
import { GetTokenFromHeader } from "../utils/auth-helper.js";
class AuthMiddleware {
  async checkDuplicateUser(req, res, next) {
    const { username = null, phone_number } = req.body;

    const withUsername = await Users.findOne({
      where: { username },
    });

    const withPhoneNumber = await Users.findOne({
      where: { phone_number },
    });

    if (withPhoneNumber || withUsername) {
      return res.status(409).send({
        message: "Failed! User is already in use!",
      });
    }

    next();
  }
}

export default new AuthMiddleware();
