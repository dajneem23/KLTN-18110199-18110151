import validate, { Joi, Segments } from '@/core/validation';

export const login = validate({
  [Segments.BODY]: Joi.object({
    loginId: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export const register = validate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).max(64).required(),
  }),
});

export const refresh = validate({
  [Segments.BODY]: Joi.object({
    user_id: Joi.string().required(),
    refresh_token: Joi.string().required(),
  }),
});

export const requestPasswordReset = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    redirect_uri: Joi.string().uri().required(),
  }),
});

export const requestEmailVerification = validate({
  [Segments.BODY]: Joi.object({
    redirect_uri: Joi.string().uri().required(),
  }),
});

export const resetPassword = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    new_password: Joi.string().min(6).max(64).required(),
  }),
});

export const changePassword = validate({
  [Segments.BODY]: Joi.object({
    current_password: Joi.string().required(),
    new_password: Joi.string().min(6).max(64).required(),
  }),
});

export const verifyEmail = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
  }),
});
