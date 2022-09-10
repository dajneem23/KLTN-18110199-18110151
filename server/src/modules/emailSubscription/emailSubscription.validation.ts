import validate, { Joi, Segments } from '@/core/validation';

export const update = validate({
  [Segments.BODY]: Joi.object({
    subscribed: Joi.boolean().required(),
    categories: Joi.array().items(Joi.string().required()).required(),
  }),
});
