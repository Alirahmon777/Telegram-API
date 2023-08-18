import { Router } from "express";
import AC from "../controllers/auth.controller.js";
import AW from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addUserValidation } from "../validators/user.validator.js";

export const authRoutes = Router();

authRoutes.post(
  "/sign-up",
  upload.single("image"),
  addUserValidation,
  AW.checkDuplicateUser,
  AC.SIGN_UP,
);
authRoutes.post("/sign-in", AC.SIGN_IN);
