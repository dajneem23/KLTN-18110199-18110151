import multer from 'multer';
import path from 'path';
import { StorageError } from '@/modules/storage/storage.error';
import { UPLOAD_MAX_FILE_SIZE, UPLOAD_MAX_IMAGE_SIZE } from '@/modules/storage/storage.constant';

/**
 * Upload image handler
 */
export const uploadImageHandler = multer({
  limits: { fileSize: UPLOAD_MAX_IMAGE_SIZE },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpg|jpeg|png|bmp|svg|gif|webp|heic/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb(new StorageError('FORMAT_IS_NOT_SUPPORTED'));
  },
}).single('file');

/**
 * Upload file handler
 */
export const uploadFileHandler = multer({
  limits: { fileSize: UPLOAD_MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}).single('file');
