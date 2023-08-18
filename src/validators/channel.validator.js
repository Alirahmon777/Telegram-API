import channelSchema from "./channel.schema.js";

export const addChannelValidation = async (req, res, next) => {
  try {
    const { error, value } = await channelSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
