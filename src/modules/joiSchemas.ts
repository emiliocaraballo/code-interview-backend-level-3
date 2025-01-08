import Joi from 'joi';

export const createItemSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages(
   {
    'any.required': 'Field {#label} is required',
    'string.min': 'Field "name" must be at least 3 characters long',
    'string.max': 'Field "name" must be at most 50 characters long',
   }
  ),
  price: Joi.number().required().positive().messages({
    'number.positive': 'Field "price" cannot be negative',
    'any.required': 'Field {#label} is required',
  }),
});

export const updateItemSchema = Joi.object({
  name: Joi.string().required().min(3).max(50).messages(
   {
    'any.required': 'Field {#label} is required',
    'string.min': 'Field "name" must be at least 3 characters long',
    'string.max': 'Field "name" must be at most 50 characters long',
   }
  ),
  price: Joi.number().required().positive().messages({
    'number.positive': 'Field "price" cannot be negative',
    'any.required': 'Field {#label} is required',
  }),
});
