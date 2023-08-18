import Joi from "joi";
import { APP } from "../config/config.js";

const userSchema = Joi.object({
  username: Joi.string(),
  phone_number: Joi.string()
    .required()
    .pattern(new RegExp(APP["PHONE_REGEX"]))
    .message("Error: only Uzbekistan numbers"),
  description: Joi.string(),
  second_name: Joi.string(),
  first_name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp(APP["PATTERN"]))
    .message(
      `Error: "password" по крайней мере 8 символы. по крайней мере 1 числовой символ. как минимум 1 строчная буква. как минимум 1 заглавная буква. по крайней мере 1 спецсимвол. ПРИМЕР: "Qwerty123$"`,
    ),
});

export default userSchema;
