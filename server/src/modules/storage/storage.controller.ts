import { Container, Service } from 'typedi';
import httpStatusCode from 'http-status';
import { Controller, Post, Res, Req, Next, Delete, Params, Auth } from '@/utils/expressDecorators';
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
import { ObjectId } from 'mongodb';
import { DIMongoDB } from '@/loaders/mongoDBLoader';

@Service()
@Controller('/')
export default class StorageController {
  logger = new Logger('StorageController');
  storage: Storage;
  constructor() {
    this.storage = new Storage({
      projectId: env.GOOGLE_CLOUD_PROJECT_ID,
      // keyFilename: path.join(__dirname, '../../../zinc-union-365709-1e0f101db822.json'),
      credentials: {
        type: 'service_account',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4vJ+v+ewJtR0O\nsbb6d9x45ZOMxz8BceqcTIzS/YZiCEoYvDQI5MZbTRm0el33/avwjkr2z1QDA9Iq\n9qSfg/9qbe3a1ELDNGpfeWc9CIR70fIo4xsddeEAoWEEgl7v7ggBTSAzc0blIdcX\nuERUzii6aNFq/ZPXa4kYVBhGrPgvk55lW51v48lzEv3iGrhV63+tWV3jMqW4+Iog\nq6m2IYASlzQN+/9i5SHorgNKY+tMsA1bA7MP7qt9GSz+KzZJsk94I7/2jrjSbgPo\n2GT7rm4PfziA0n9rdGi/c4OqV8meboLXm27RZyZWn93mD5KuvN9mY5baM/E/vCRg\nLLrIlRD5AgMBAAECggEAFVcu4EqP9pgeRPQJJfqCNNIafy0GLYHOHyOlsfr5EuqP\nurdFEJDzDBmGQmfPYqZCfk3Fwai2NQn0NaPb5RR/xTjxPPH/y2KK9kAFSdLp0Q7x\n+UCxAXB8X1EFLtrroi5ebN4OvfrPYglMenA+LojJQi15IbGs6joBMpcGXeW93urt\nmdnVueo7igloUDrz6ZqDYY6UtuHImwpa0g/FQq3xI9VjcIBYwZsod2pCndoTx17N\npRdI/eMcYAnNiJhfDu7xnZXLcP3THTpLyZ7leGSaIbPl5s6+TMcRKxtg6jWYxnk8\n+adCakQPacsxJBp0jAWOcGOHvc5djR+/lOjDq5kGHQKBgQDjkGXE7sybHcEGKd6E\nA+SmnD8Q+WGV4+WL2nu5SAHHZQT36IzUIZ4eNPDz//DeKpMi/d81cqVfr2gLa2dW\ngWls81JfsbJjwIvW5J+RHWG2fmpWSG1BIG/7zQcH81yDXe0QcSZrVnY3U+tEfhiD\nMiPHU2udz39r6eHp0R7Gu2drnQKBgQDP0jcQArGjVreCPnPF/8ryQZGFSqTka69F\nXyXK3TbQctoFpCb98gLRIVk4xvkAn6vbT8NMBz14GGG9tup30XttXAycBIlqeyRk\nbJNHJgr21wi0/JTZrX9krpLcn6yy50+3VZ449xmONqYyUCXnuvK8ufqQTIeWHbgN\naUwrRmTiDQKBgQDfFbSezZdpTU7n8u2/r21c4/lzc3Z2Ebb7VlFJ/sw3o9GuEpzU\nbKxsYmwAV1zS/xvFBunlpKF4XyV5ZG4mwLEQbKzJQRNndN/h57iB8zLSS7WFJnVs\njhcZ2xHUen+sDM0U/Ee0nEtBzBPszkzLeMDYa/ApAbyhluOwayBnpForhQKBgQCO\nokTQZEjvRjEk3yAuoOT1aDMsPJL3g0EEZ81UcoeQgYNJo+RvHo74Yd8OrOFxoCUf\nnJr5r25s4q8SulwqaEhCQo8U9bgqsOHFWw+qIV4dFHERZtnynLV2sKpzadPp5gA8\nYDL7/fw4MyHWHlQlu5WmGi7yotPcIAGWktKIUQQkcQKBgQC2wQZ18Bx8Ioc+sICL\nL9W89Rpkb4aRa0J6yzbNXyTemOnYk9JhGT/K3kdjvkv5H2U9e2nIQ7EcOxu31p5T\n3QgOMMN6rzwLY56Gbm+zWVi0hXeSQcIW6wKXmPLVuEHCXT35TEBbPczlcb6qdunH\no6CO0Ok2RAulgqSP0hxr7eiY6Q==\n-----END PRIVATE KEY-----\n',
        client_email: '239259098538-compute@developer.gserviceaccount.com',
        client_id: '105125885024405395033',
      },
    });
  }
  @Post('/upload/', [protect()])
  async uploadFile(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,

    @Auth() auth: any,
  ) {
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

        const filename =
          slugify(req.file.originalname + Date.now(), {
            replacement: '-',
            lower: true,
            strict: true,
            locale: 'vi',
            remove: RemoveSlugPattern,
          }) + path.extname(file.originalname);
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
        stream.on('finish', async () => {
          this.logger.info('uploadFile', 'finish', filename);
          const url = `https://storage.googleapis.com/${env.GOOGLE_CLOUD_BUCKET}/${filename}`;

          const uploadedFile = {
            _id: new ObjectId(),
            name: filename,
            alternativeText: '',
            caption: '',
            hash: filename,
            ext: path.extname(file.originalname),
            mime: file.mimetype,
            size: file.size,
            url,
            provider: 'google-cloud-storage',
            width: 200,
            height: 200,
            related: [] as any,
            createdAt: new Date(),
            updatedAt: new Date(),
            created_by: new ObjectId(auth._id),
            updated_by: new ObjectId(auth._id),
          };
          res.status(httpStatusCode.CREATED).json({
            url,
            _id: uploadedFile._id,
          });
          await Container.get(DIMongoDB).collection('upload_file').insertOne(uploadedFile);
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
