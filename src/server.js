import "dotenv/config";
import express from "express";
import { APP } from "./config/config.js";
import { testConnection } from "./db/db.js";
import { modelSync, relation } from "./models/relations.js";
import cors from "cors";
import {
  authRoutes,
  channelRoutes,
  groupRoutes,
  userChannelRoutes,
  userGroupRoutes,
  UserRoutes,
} from "./routes/index.js";
import {
  DeleteUnusedUserImages,
  DeleteUnusedGroupImages,
  DeleteUnusedChannelImages,
} from "./utils/autoDeleteImages.js";

const bootstrap = async () => {
  const app = express();
  await modelSync();
  app.use(express.json());
  app.use(cors());
  app.use("/api/media", [
    express.static(APP["USER_AVTR"]),
    express.static(APP["CHAN_AVTR"]),
    express.static(APP["GRP_AVTR"]),
  ]);
  app.use("/api", [
    UserRoutes,
    authRoutes,
    groupRoutes,
    channelRoutes,
    userGroupRoutes,
    userChannelRoutes,
  ]);

  app.listen(APP.PORT, APP.HOST, () =>
    console.log(`Server running on http://${APP.HOST}:${APP.PORT}`),
  );
};

(async () => {
  try {
    await testConnection();
    await relation();
    await bootstrap();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
})();

// har yarim soatda keraksiz rasmlarni tekshirib uni o'chiradi
setInterval(
  async () => {
    await DeleteUnusedUserImages();
    await DeleteUnusedChannelImages();
    await DeleteUnusedGroupImages();
  },
  10 * 30 * 1000,
);
