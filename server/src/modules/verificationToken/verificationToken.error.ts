import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  INVALID_VERIFICATION_TOKEN: {
    message: 'Invalid or expired verification token',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Mã xác thực không hợp lệ hoặc đã hết hạn',
    },
  },
});

export class VerificationTokenError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
