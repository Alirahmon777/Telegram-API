import multer from "multer";
import { APP } from "../config/config.js";
import { cleanNameFile } from "../utils/helpers.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, APP.USER_AVTR);
  },

  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, cleanNameFile(originalname));
  },
});

const group_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, APP.GRP_AVTR);
  },

  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, cleanNameFile(originalname));
  },
});

const channel_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, APP.CHAN_AVTR);
  },

  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, cleanNameFile(originalname));
  },
});

export const upload = multer({ storage });
export const group_upload = multer({ storage: group_storage });
export const channel_upload = multer({ storage: channel_storage });
