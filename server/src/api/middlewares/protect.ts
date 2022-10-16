import { RequestHandler } from 'express';
import { throwErr } from '@/utils/common';
import { AuthError } from '@/modules/auth/auth.error';
import AuthService from '@/modules/auth/auth.service';
import { IncomingHttpHeaders } from 'http';
import { Container } from 'typedi';
import BlocklistService from '@/modules/auth/blocklist.service';
import { RolesWeight } from '@/modules';
import { getHighestRole } from '@/modules/auth/auth.utils';

export type ProtectOpts = {
  ignoreException?: boolean;
  weight?: number;
};

const defaultOpts: ProtectOpts = {
  ignoreException: false,
  weight: 0,
};

/**
 * Detect and verify access token
 */
const verifyAccessToken = async (cookies: any) => {
  const blocklistService = Container.get(BlocklistService);

  // Detect token
  const accessToken = cookies['access_token'];
  if (!accessToken) throwErr(new AuthError('NO_TOKEN_PROVIDED'));
  // Verify token
  const decoded = AuthService.verifyBearerTokens(accessToken);
  // Check blocklist
  // if (await blocklistService.isOnTemporaryBlockList(decoded.id)) {
  //   throwErr(new AuthError('ACCESS_TOKEN_EXPIRED'));
  // }
  return decoded;
};

/**
 * Authentication middleware
 */
export const protect =
  ({ ignoreException, weight = 0 }: ProtectOpts = defaultOpts): RequestHandler =>
  async (req, res, next) => {
    try {
      req.auth = await verifyAccessToken(req.cookies);
      const { roles: userRoles } = req.auth;
      getHighestRole(userRoles) >= weight ? next() : next(new AuthError('ACCESS_DENIED'));
    } catch (err) {
      if (ignoreException) return next();
      return next(err);
    }
  };

/**
 * [Private] Authentication middleware
 */
// export const protect = (): RequestHandler => async (req, res, next) => {
//   try {
//     const decoded = await verifyAccessToken(req.headers);
//     if (!decoded.roles || !decoded.roles.includes('admin')) {
//       throwErr(new AuthError('PERMISSION_DENIED'));
//     }
//     req.auth = decoded;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };
