// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { RouterOptions } from 'express';

import { ExpressMeta, getMeta } from './meta';
import { MiddlewareFn } from './middleware';

/**
 * Registers controller for base url
 */
export function Controller(url: string, middlewares?: MiddlewareFn[]);
export function Controller(url: string, routerOptions?: RouterOptions, middlewares?: MiddlewareFn[]);
export function Controller(
  url: string,
  middlewareOrRouterOptions?: MiddlewareFn[] | RouterOptions,
  middlewares: MiddlewareFn[] = [],
) {
  return (target: any) => {
    const meta: ExpressMeta = getMeta(target.prototype);

    meta.url = url;
    meta.middlewares = Array.isArray(middlewareOrRouterOptions)
      ? middlewareOrRouterOptions.concat(meta.middlewares ?? [])
      : middlewares.concat(meta.middlewares ?? []);
    meta.routerOptions = Array.isArray(middlewareOrRouterOptions) ? null : middlewareOrRouterOptions;
  };
}
