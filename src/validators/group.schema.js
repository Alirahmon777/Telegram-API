import Joi from "joi";

const groupSchema = Joi.object({
  group_name: Joi.string().required(),
  group_link: Joi.string(),
  creator_id: Joi.string().required(),
});

export default groupSchema;
