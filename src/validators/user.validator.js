import userSchema from "./user.schema.js";

export const addUserValidation = async (req, res, next) => {
  try {
    const { error, value } = await userSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
