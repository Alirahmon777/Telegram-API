import { Router } from "express";
import CHC from "../controllers/channel.controller.js";
import BM from "../middlewares/basic.middleware.js";
import { channel_upload } from "../middlewares/multer.middleware.js";
import { addChannelValidation } from "../validators/channel.validator.js";

export const channelRoutes = Router();

channelRoutes.get("/channels", CHC.GET_CHANNELS);
channelRoutes.get("/channel/:id", BM.CHECK_ID, CHC.GET_CHANNEL);
channelRoutes.post(
  "/channel",
  channel_upload.single("image"),
  addChannelValidation,
  BM.CHECK_LINK,
  CHC.ADD_CHANNEL,
);
