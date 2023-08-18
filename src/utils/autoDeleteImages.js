import { Group, Channel, Users } from "../models/index.js";
import { DeleteFile, ExistsFile, ReadPublicFolder } from "./filesystem.js";
import { join } from "path";

export const DeleteUnusedUserImages = async () => {
  try {
    const images = ReadPublicFolder("users");

    for (let image of images) {
      try {
        const user = await Users.findOne({ where: { filename: image } });

        if (!user) {
          const imagePath = join("public", "users", image);

          if (ExistsFile(imagePath)) {
            DeleteFile(imagePath);
            console.log(`Unused picture "${image}" deleted on users`);
          }
        }
      } catch (error) {
        console.error(`Error processing image "${image}":`, error);
      }
    }
  } catch (e) {
    console.error("An error occurred while fetching images:", e);
  }
};

export const DeleteUnusedGroupImages = async () => {
  try {
    const images = ReadPublicFolder("groups");

    for (let image of images) {
      try {
        const book = await Group.findOne({ where: { filename: image } });

        if (!book) {
          const imagePath = join("public", "groups", image);

          if (ExistsFile(imagePath)) {
            DeleteFile(imagePath);
            console.log(`Unused picture "${image}" deleted on groups`);
          }
        }
      } catch (error) {
        console.error(`Error processing image "${image}":`, error);
      }
    }
  } catch (e) {
    console.error("An error occurred while fetching images:", e);
  }
};

export const DeleteUnusedChannelImages = async () => {
  try {
    const images = ReadPublicFolder("channel");

    for (let image of images) {
      try {
        const book = await Channel.findOne({ where: { filename: image } });

        if (!book) {
          const imagePath = join("public", "channel", image);

          if (ExistsFile(imagePath)) {
            DeleteFile(imagePath);
            console.log(`Unused picture "${image}" deleted on channel`);
          }
        }
      } catch (error) {
        console.error(`Error processing image "${image}":`, error);
      }
    }
  } catch (e) {
    console.error("An error occurred while fetching images:", e);
  }
};
