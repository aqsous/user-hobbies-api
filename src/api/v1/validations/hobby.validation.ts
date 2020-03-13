import * as Joi from "joi";

export const createHobbyModel = Joi.object().keys({
  user: Joi.string().required(),
  name: Joi.string().required(),
  passionLevel: Joi.string().valid('Low', 'Medium', 'High', 'Very High').required(),
  year: Joi.number().required(),
});

export const listUserHobby = Joi.object().keys({
  userId: Joi.string().required(),
});

export const hobbyIdModel = Joi.object().keys({
  hobbyId: Joi.string().required(),
});