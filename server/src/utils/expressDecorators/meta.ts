import { RouterOptions } from 'express';

import { MiddlewareFn } from './middleware';

/**
 * All possible parameter decorator types
 */
export enum ParameterType {
  REQUEST,
  RESPONSE,
  PARAMS,
  QUERY,
  BODY,
  HEADERS,
  COOKIES,
  NEXT,
  AUTH,
}

/**
 * Cached(meta) parameter configuration
 */
export interface ParameterConfiguration {
  index: number;
  type: ParameterType;
  name?: string;
  data?: any;
}

/**
 * Cached(meta) route configuration
 */
export interface Route {
  method: string;
  url: string;
  middlewares: MiddlewareFn[];
}

/**
 * Express decorators controller metadata
 */
export interface ExpressMeta {
  url: string;
  routerOptions?: RouterOptions;
  routes: {
    [instanceMethodName: string]: {
      [key: string]: Route;
    };
  };
  middlewares: MiddlewareFn[];
  params: {
    [key: string]: ParameterConfiguration[];
  };
}

/**
 * Express decorators controller
 */
export interface ExpressClass {
  __express_meta__?: ExpressMeta;
}

/**
 * Get or initiate metadata on a target
 */
export function getMeta(target: ExpressClass) {
  if (!target.__express_meta__) {
    target.__express_meta__ = {
      url: '',
      middlewares: [],
      routes: {},
      params: {},
    };
  }
  return target.__express_meta__;
}
