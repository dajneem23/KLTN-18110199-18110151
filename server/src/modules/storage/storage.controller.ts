import { Container, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Post, Res, Req, Next, Delete, Params } from '@/utils/expressDecorators';
import { Response, Request, NextFunction } from 'express';
import { protect } from '@/api/middlewares/protect';
import { uploadImageHandler } from '@/modules/storage/storage.util';
import { StorageError } from '@/modules/storage/storage.error';
import { COLLECTION_NAMES, RemoveSlugPattern } from '@/types';
import { env } from 'process';
import path from 'path';
import { Storage } from '@google-cloud/storage';
import Logger from '@/core/logger';
import slugify from 'slugify';

@Service()
@Controller('/')
export default class StorageController {
  logger = new Logger('StorageController');
  storage: Storage;
  constructor() {
    this.storage = new Storage({
      projectId: env.GOOGLE_CLOUD_PROJECT_ID,
      keyFilename: path.join(__dirname, '../../../zinc-union-365709-1e0f101db822.json'),
    });
  }
  @Post('/upload/', [protect()])
  async uploadFile(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    uploadImageHandler(req, res, async (err) => {
      try {
        if (err) {
          if (err.code === 'LIMIT_FILE_SIZE') return next(new StorageError('IMAGE_TOO_LARGE'));
          return next(err);
        }
        // const { folder = 'common' } = req.body;
        const { file } = req;
        if (!file) return next(new StorageError('NO_FILE_UPLOADED'));
        // if (!COLLECTION_NAMES[folder as keyof typeof COLLECTION_NAMES]) {
        //   return next(new StorageError('FOLDER_NOT_FOUND'));
        // }
        // const result = await s3BucketClient.uploadPublicFile(file.buffer, {
        //   prefixPath: `wikiblock/${folder && `${folder}/`}images`,
        //   originalname: file.originalname,
        // });
        const filename = slugify(req.file.originalname + Date.now(), {
          replacement: '-',
          lower: true,
          strict: true,
          locale: 'vi',
          remove: RemoveSlugPattern,
        });
        const bucket = this.storage.bucket(env.GOOGLE_CLOUD_BUCKET);
        const newFile = bucket.file(filename);
        const stream = newFile.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });
        stream.on('error', (err) => {
          this.logger.error('uploadFile', err);
          next(err);
        });
        stream.on('finish', () => {
          this.logger.info('uploadFile', 'finish', filename);
          res.status(httpStatusCode.CREATED).json({
            url: `https://storage.googleapis.com/${env.GOOGLE_CLOUD_BUCKET}/${filename}`,
          });
        });
        stream.end(req.file.buffer);
        // res.status(httpStatusCode.CREATED).json(result);
      } catch (err) {
        next(err);
      }
    });
  }
  // @Delete('/files', [protect()])
  // async deleteFile(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {}
}
