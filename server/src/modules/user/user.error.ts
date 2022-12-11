import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';

const errors = Object.freeze({
  USER_NOT_FOUND: {
    message: 'User does not exist',
    code: null,
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
    locales: {
      vi: 'Người dùng không tồn tại',
    },
  },
  EMAIL_ALREADY_VERIFIED: {
    message: 'Email is already verified',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Email đã được xác thực',
    },
  },
  CANNOT_DELETE_ADMIN_ACCOUNT: {
    message: 'Cannot delete Admin account',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Không thể xóa tài khoản Admin',
    },
  },
  CATEGORY_NOT_FOUND: {
    message: 'Category does not exist',
    code: null,
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
    locales: {
      vi: ' Danh mục không tồn tại',
    },
  },
});

export class UserError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
