import { ExpressMeta, ParameterType, getMeta } from './meta';

/**
 * Parameter decorator factory, creates parameter decorator
 */
function decoratorFactory(type: ParameterType) {
  return function (name?: string): ParameterDecorator {
    return function (target: any, methodName: string, index: number) {
      const meta: ExpressMeta = getMeta(target);

      if (meta.params[methodName] === undefined) {
        meta.params[methodName] = [];
      }

      meta.params[methodName].push({ index, type, name });
    };
  };
}

// Express req
export const Req = decoratorFactory(ParameterType.REQUEST);
// Express res
export const Res = decoratorFactory(ParameterType.RESPONSE);
// Express next
export const Next = decoratorFactory(ParameterType.NEXT);
// Express req.params
export const Params = decoratorFactory(ParameterType.PARAMS);
// Express req.query
export const Query = decoratorFactory(ParameterType.QUERY);
// Express req.body
export const Body = decoratorFactory(ParameterType.BODY);
// Express req.headers
export const Headers = decoratorFactory(ParameterType.HEADERS);
// Express req.cookies
export const Cookies = decoratorFactory(ParameterType.COOKIES);
// Express req.auth
export const Auth = decoratorFactory(ParameterType.AUTH);
