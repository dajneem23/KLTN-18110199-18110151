import { celebrate, Joi as CelebrateJoi, SchemaOptions, Segments as CelebrateSegments } from 'celebrate';
import { RequestHandler } from 'express';

export const Joi = CelebrateJoi;

export const Segments = CelebrateSegments;

export default (schema: SchemaOptions): RequestHandler =>
  celebrate(schema, {
    // When true, stops validation on the first error, otherwise returns all the errors found.
    abortEarly: false,
  });
