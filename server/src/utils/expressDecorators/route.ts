import { ExpressMeta, getMeta } from './meta';
import { MiddlewareFn } from './middleware';

export type RouteDecorator = (url: string, middlewares?: MiddlewareFn[]) => any;

/**
 * Route decorator factory, creates decorator
 */
function decoratorFactory(httpMethod: string, url: string, middlewares: MiddlewareFn[] = []) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const meta: ExpressMeta = getMeta(target);

    // Init the routes dictionary
    const routes = (meta.routes[key] = meta.routes[key] || {});
    const routeKey = `${httpMethod}.${url}`;
    if (routes[routeKey]) {
      // The combination of httpMethod and url is already registered for this method (fn)
      // let's not register a new route but concat its middlewares
      routes[routeKey].middlewares = [...routes[routeKey].middlewares, ...middlewares];
    } else {
      // This is a new route for the method
      routes[routeKey] = {
        method: httpMethod,
        url,
        middlewares,
      };
    }
    return descriptor;
  };
}

/**
 * Route decorators
 */
export const All: RouteDecorator = (url, middlewares) => decoratorFactory('all', url, middlewares);
export const Get: RouteDecorator = (url, middlewares) => decoratorFactory('get', url, middlewares);
export const Post: RouteDecorator = (url, middlewares) => decoratorFactory('post', url, middlewares);
export const Put: RouteDecorator = (url, middlewares) => decoratorFactory('put', url, middlewares);
export const Delete: RouteDecorator = (url, middlewares) => decoratorFactory('delete', url, middlewares);
export const Patch: RouteDecorator = (url, middlewares) => decoratorFactory('patch', url, middlewares);
export const Options: RouteDecorator = (url, middlewares) => decoratorFactory('options', url, middlewares);
export const Head: RouteDecorator = (url, middlewares) => decoratorFactory('head', url, middlewares);
