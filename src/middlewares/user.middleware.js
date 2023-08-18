import { duplicatedMiddlewares } from "../utils/helpers.js";
import { GetTokenFromHeader } from "../utils/auth-helper.js";
import { Users } from "../models/index.js";

class UserMiddleware {
  verifyToken = (req, res, next) => {
    const { token } = GetTokenFromHeader(req);

    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    return duplicatedMiddlewares(req, res, next, token);
  };

  async USER_VALID(req, res, next) {
    try {
      const { id } = req.params;

      const user = await Users.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: "User Not found!" });
      }

      next();
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

export default new UserMiddleware();
