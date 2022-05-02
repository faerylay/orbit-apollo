import Joi from 'joi'

const title = Joi.string()
  .min(5)
  .max(50)
  .required()
  .label('title')

const description = Joi.string()
  .min(5)
  .required()
  .label('description')

export const postValidate = Joi.object().keys({
  title,
  description
})
