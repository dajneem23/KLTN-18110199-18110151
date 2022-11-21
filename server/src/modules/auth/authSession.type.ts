import { CreateUpdateUserInput, User } from '@/modules/user/user.type';

export interface AuthSession {
  // Auth session ID
  id: string;
  // User ID
  user_id: string;
  // IP address (e.g. 14.187.107.80)
  ip: string;
  // Logged in device (e.g. Windows PC)
  device_name: string;
  // The refresh token, which can be used to obtain new access token
  refresh_token: string;
  // The session (refresh token) expires
  expires: Date;
  // Date and time auth session was created
  created_at: Date;
  // Date and time auth session was last updated
  updated_at: Date;
}

export type RegisterInput = CreateUpdateUserInput;

export type JWTPayload = Pick<User, 'id' | '_id' | 'email' | 'email_verified' | 'name' | 'picture' | 'roles'>;

export type BearerTokens = {
  // token_type: 'bearer';
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
};
