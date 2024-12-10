import Joi from "joi";
import TransactionSchema from "./transaction.validator.js";

const UserSchema = Joi.object({
  email: Joi.string()
    .required()
    .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)),
  username: Joi.string().required(),
  password: Joi.string().min(8).max(255).required(),
  phoneNumber: Joi.number().integer().required(),
  transaction: Joi.array().items(TransactionSchema).optional(),
});

const UserLoginSchema = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().min(8).max(255).required(),
});

export { UserSchema, UserLoginSchema };
