import Joi from "joi";

const channelSchema = Joi.object({
  channel_name: Joi.string().required(),
  channel_link: Joi.string(),
  creator_id: Joi.string().required(),
});

export default channelSchema;
