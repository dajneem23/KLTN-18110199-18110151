export type VerificationTokenType = 'email_verification' | 'password_reset' | 'confirm_request';

export interface VerificationToken {
  id: string;
  email: string;
  type: VerificationTokenType;
  token: string;
  url?: string;
  expires: Date;
  created_at: Date;
}

export type VerificationTokenOutput = VerificationToken;
