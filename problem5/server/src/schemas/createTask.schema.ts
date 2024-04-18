import Joi from "joi"
export const createTaskSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.number().valid(0, 1, 2).required(),
  due: Joi.date().required(),
  completed: Joi.boolean(),
})