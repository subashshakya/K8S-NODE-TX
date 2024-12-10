import Joi from "joi";

const TransactionSchema = Joi.object({
  createdDate: Joi.date().less("now").required(),
  lastModifiedDate: Joi.date().less("now").optional(),
  description: Joi.string().max(255).min(5).optional(),
  amount: Joi.number().positive().required(),
  remarks: Joi.string().max(255).optional(),
  status: Joi.string().max(20).min(3).required(),
  userId: Joi.number().integer().optional(),
});

export default TransactionSchema;
