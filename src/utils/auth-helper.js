import jwt from "jsonwebtoken";
import { DB } from "../config/config.js";

export const AuthHelper = (phone_number) => ({
  AccessToken: jwt.sign({ phone_number }, DB["SECRET_KEY"]),
  RefreshToken: jwt.sign({ phone_number }, DB["REFRESH_SECRET_KEY"]),
});

export const GetTokenFromHeader = (req) => ({
  token: req.headers?.authorization?.split(" ")[1],
});

export const VerifyJwt = (token, options) => {
  return jwt.verify(token, DB["SECRET_KEY"], options);
};
