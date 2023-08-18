import groupSchema from "./group.schema.js";

export const addGroupValidation = async (req, res, next) => {
  try {
    const { error, value } = await groupSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
