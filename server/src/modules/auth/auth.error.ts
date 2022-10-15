import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

export const errors = Object.freeze({
  INCORRECT_LOGIN_ID_OR_PASSWORD: {
    message: 'Incorrect login ID or password',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Tên đăng nhập hoặc mật khẩu không chính xác',
    },
  },
  INCORRECT_PASSWORD: {
    message: 'Incorrect password',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Mật khẩu không đúng',
    },
  },
  INVALID_NEW_PASSWORD: {
    message: 'The new password must be different from the current password',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Mật khẩu mới không được trùng với mật khẩu hiện tại',
    },
  },
  EMAIL_ALREADY_EXISTS: {
    message: 'Email already exists',
    code: null,
    status: httpStatusCode.CONFLICT,
    isPublic: true,
    locales: {
      vi: 'Tài khoản hoặc email đã tồn tại',
    },
  },
  NO_TOKEN_PROVIDED: {
    message: 'No access token provided',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Yêu cầu Access token',
    },
  },
  INVALID_ACCESS_TOKEN: {
    message: 'Invalid access token',
    code: null,
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Access token không hợp lệ',
    },
  },
  ACCESS_TOKEN_EXPIRED: {
    message: 'Access token expired',
    code: '1001',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Access token đã hết hạn',
    },
  },
  INVALID_REFRESH_TOKEN: {
    message: 'Invalid or expired refresh token',
    code: '1002',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Refresh token không hợp lệ hoặc đã hết hạn',
    },
  },
  PERMISSION_DENIED: {
    message: 'Permission denied',
    code: '1003',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Không có quyền truy cập',
    },
  },
  ACCOUNT_SUSPENDED: {
    message: 'This account has been suspended',
    code: '1003',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Tài khoản đã bị khóa',
    },
  },
  ACCESS_DENIED: {
    message: 'ACCESS DENIED',
    code: '1004',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Không có quyền truy cập',
    },
  },
});

export class AuthError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
