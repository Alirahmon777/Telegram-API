import { join } from "path";

const APP = {
  PORT: process.env["PORT"],
  HOST: process.env["HOST"],
  USER_AVTR: join(process.cwd(), "public", "users"),
  CHAN_AVTR: join(process.cwd(), "public", "channel"),
  GRP_AVTR: join(process.cwd(), "public", "groups"),
  PATTERN: process.env["PW_PATTERN"],
  PHONE_REGEX: process.env["PHONE_REGEX"],
};
const DB = {
  _URI: process.env["DB_URI"],
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
};

export { APP, DB };
