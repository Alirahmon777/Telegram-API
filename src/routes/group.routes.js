import { Router } from "express";
import GC from "../controllers/group.controller.js";
import BM from "../middlewares/basic.middleware.js";
import { group_upload } from "../middlewares/multer.middleware.js";
import { addGroupValidation } from "../validators/group.validator.js";

export const groupRoutes = Router();

groupRoutes.get("/groups", GC.GET_GROUPS);
groupRoutes.get("/group/:id", BM.CHECK_ID, GC.GET_GROUP);
groupRoutes.post(
  "/group",
  group_upload.single("image"),
  addGroupValidation,
  BM.CHECK_LINK,
  GC.ADD_GROUP,
);
