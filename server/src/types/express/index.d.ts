import { JWTPayload } from '@/modules/auth/authSession.type';

declare global {
  namespace Express {
    export interface Request {
      auth: JWTPayload | undefined;
    }
  }
}
