import Joi from "joi"
export const updateTaskSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  priority: Joi.number().valid(0, 1, 2),
  due: Joi.date(),
  completed: Joi.boolean(),
})