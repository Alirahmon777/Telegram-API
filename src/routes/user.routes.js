import { Router } from "express";
import UC from "../controllers/user.controller.js";
import UM from "../middlewares/user.middleware.js";
import BM from "../middlewares/basic.middleware.js";

export const UserRoutes = Router();

UserRoutes.get("/users", UC.GET_USERS);
UserRoutes.get("/user", UM["verifyToken"], UC["GET_USER"]);
UserRoutes.post("/user-message", UC["ADD_MESSAGE"]);
UserRoutes.delete("/user/:id", BM.CHECK_ID, UM.USER_VALID, UC.DELETE_USERS);
