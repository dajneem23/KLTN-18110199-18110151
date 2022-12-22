import validate, { Joi, Segments } from '@/core/validation';

export const updateMe = validate({
  [Segments.BODY]: Joi.object({
    name: Joi.string(),
    picture: Joi.string(),
    avatar: Joi.string(),
    gender: Joi.string().valid('male', 'female', 'other'),
    dob: Joi.date(),
  }),
});

export const privateQuery = validate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().default(1),
    per_page: Joi.number().default(10),
    sort_by: Joi.string().default('created_at'),
    sort_order: Joi.string().valid('desc', 'asc'),
    status: Joi.string().valid('active', 'inactive', 'suspended'),
    q: Joi.string().allow(''),
  }),
});

export const privateCreateUpdateUser = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    full_name: Joi.string(),
    picture: Joi.string().uri().allow(''),
    gender: Joi.string().valid('male', 'female', 'other'),
    dob: Joi.date(),
    metadata: Joi.object({
      admin_note: Joi.string().allow(''),
    }),
  }),
});

export const privateSetRoles = validate({
  [Segments.BODY]: Joi.object({
    roles: Joi.array().items(Joi.string().valid('user', 'admin')).min(1).required(),
  }),
});
