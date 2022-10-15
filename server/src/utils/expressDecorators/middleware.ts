// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Request, Response, NextFunction, RequestHandler, ErrorRequestHandler } from 'express';
import { Container, Token } from 'typedi';

export interface CustomFunction extends Function {
  new (...args: any[]);
}

export type MiddlewareFn = CustomFunction | any;

/**
 * Middleware class interface
 */
export interface Middleware {
  use(request: Request, response: Response, next: NextFunction): void;
}

/**
 * Error middleware interface
 */
export interface ErrorMiddleware {
  use(error: any, request: Request, response: Response, next: NextFunction): void;
}

/**
 * Create request middleware handler that uses class or function provided as middleware
 */
export function middlewareHandler(middleware: MiddlewareFn): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): any {
    try {
      return getMiddleware(middleware, [req, res, next]);
    } catch (error) {
      next(error);
    }
  };
}

/**
 * Error Middleware class registration DI token
 */
export const ERROR_MIDDLEWARE = new Token('ERROR_MIDDLEWARE');

/**
 * Add error middleware to the app
 */
export function errorMiddlewareHandler(): ErrorRequestHandler {
  return function (error: Error, req: Request, res: Response, next: NextFunction): void {
    try {
      return getMiddleware(ERROR_MIDDLEWARE, [error, req, res, next]);
    } catch {
      next(error);
    }
  };
}

/**
 * Instantiate middleware and invoke it with arguments
 */
function getMiddleware(middleware: Token<any> | MiddlewareFn, args: any[]) {
  const next: NextFunction = args[args.length - 1]; // Last parameter is always the next function
  let instance;

  try {
    // First, trying to get instance from the container
    instance = Container.get(middleware);
  } catch {
    try {
      // If container fails, trying to instantiate it
      instance = new (middleware as MiddlewareFn)();
    } catch {
      // If instantiation fails, try to use it as is
      instance = middleware as any;
    }
  }

  // First, assuming that middleware is a class, try to use it, otherwise use it as a function
  const result = instance.use
    ? (instance as Middleware | ErrorMiddleware).use.apply(instance, args)
    : (instance as MiddlewareFn).apply(instance, args);

  // If result of execution is a promise, add additional listener to catch error
  if (result instanceof Promise) {
    result.catch((e) => next(e));
  }

  return result;
}
