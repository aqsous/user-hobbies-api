import * as Joi from "joi";


export const createUserModel = Joi.object().keys({
  name: Joi.string().required(),
});

export const userIdModel = Joi.object().keys({
  userId: Joi.string().required()
  // userId: Joi.objectId().validate(new ObjectId())
});
