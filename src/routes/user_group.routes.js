import { Router } from "express";
import UGC from "../controllers/user_group.controller.js";
import BM from "../middlewares/basic.middleware.js";

export const userGroupRoutes = Router();

userGroupRoutes.post("/user-group", BM.CHECK_LINK, UGC.ADD_USER_GROUP);
