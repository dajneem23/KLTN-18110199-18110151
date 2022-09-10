import httpStatusCode from 'http-status';

export const CommonError = {
  INPUT_INVALID: {
    message: 'Input invalid',
    code: '400',
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Dữ liệu nhập vào không hợp lệ',
      en: 'Input invalid',
    },
  },
  DATABASE_ERROR: {
    message: 'Database error',
    code: '500',
    status: httpStatusCode.INTERNAL_SERVER_ERROR,
    isPublic: true,
    locales: {
      vi: 'Lỗi cơ sở dữ liệu',
      en: 'Data base error',
    },
  },
  PERMISSION_DENIED: {
    message: 'Permission denied',
    code: '1003',
    status: httpStatusCode.UNAUTHORIZED,
    isPublic: true,
    locales: {
      vi: 'Không có quyền này',
    },
  },
};
