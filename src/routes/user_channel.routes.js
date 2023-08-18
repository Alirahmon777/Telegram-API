import { Router } from "express";
import UCHC from "../controllers/user_channel.controller.js";
import BM from "../middlewares/basic.middleware.js";

export const userChannelRoutes = Router();

userChannelRoutes.post("/user-channel", BM.CHECK_LINK, UCHC.ADD_USER_CHANNEL);
