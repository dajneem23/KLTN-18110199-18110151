import httpStatusCode from 'http-status';
import AppError, { AppErrorJSON } from '@/core/errors/AppError';
import { UPLOAD_MAX_IMAGE_SIZE } from './storage.constant';
import { convertBytesToMB } from '@/utils/common';

export const errors = Object.freeze({
  NO_FILE_UPLOADED: {
    message: 'No file uploaded',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'File tải lên rỗng',
    },
  },
  IMAGE_TOO_LARGE: {
    message: `File too large! Max file size: ${convertBytesToMB(UPLOAD_MAX_IMAGE_SIZE)}MB`,
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: `Kích thước file quá lớn! Giới hạn: ${convertBytesToMB(UPLOAD_MAX_IMAGE_SIZE)}MB`,
    },
  },
  FORMAT_IS_NOT_SUPPORTED: {
    message: 'The format is not supported',
    code: null,
    status: httpStatusCode.BAD_REQUEST,
    isPublic: true,
    locales: {
      vi: 'Định dạng không được hỗ trợ',
    },
  },
  FOLDER_NOT_FOUND: {
    message: 'Folder not found',
    code: null,
    status: httpStatusCode.NOT_FOUND,
    isPublic: true,
    locales: {
      vi: 'Thư mục không tồn tại',
    },
  },
});

export class StorageError extends AppError {
  constructor(msg: keyof typeof errors, errDetails?: AppErrorJSON['details']) {
    super({ ...errors[msg], ...(errDetails && { details: errDetails }) });
  }
}
