import { S3ClientConfig, S3 } from '@aws-sdk/client-s3';
import { Service } from 'typedi';
import env from '@/config/env';
import { alphabetSize24 } from '@/utils/randomString';
import Logger from '@/core/logger';

export type UploadFileOptions = {
  originalname: string;
  prefixPath: string | 'images' | 'files';
};

@Service()
export default class S3BucketClient {
  private logger = new Logger('S3BucketClient');
  private readonly bucket: string;
  private readonly clientConfig: S3ClientConfig;
  private s3Client: S3;

  constructor(bucketName: string, clientConfig: S3ClientConfig) {
    this.bucket = bucketName;
    this.clientConfig = clientConfig;
    this.s3Client = new S3(clientConfig);
  }

  /**
   * Generate upload file name
   *
   * @example
   *   INPUT: "hello-world.JPG"
   *   OUTPUT: "64a659f3fc004daf8b631c01aa634382.jpg"
   */
  static async generateUploadFileName(originalName: string) {
    const extRegex = /(?:\.([^.]+))?$/;
    // Get extension (e.g. jpg, png,...)
    const ext = extRegex.exec(originalName)[1].toLowerCase();
    // Generate file name (e.g. 64a659f3fc004daf8b631c01aa634382)
    const name = await alphabetSize24();
    return `${name}.${ext}`;
  }

  /**
   * Get object URL
   */
  getObjectURL(key: string) {
    return `https://s3.${this.clientConfig.region}.amazonaws.com/${this.bucket}/${key}`;
  }

  /**
   * Check bucket is exists
   */
  async isExists() {
    try {
      const loc = await this.s3Client.getBucketLocation({ Bucket: this.bucket });
      return !!loc;
    } catch (err) {
      return false;
    }
  }

  /**
   * Upload a public file
   */
  async uploadPublicFile(file: Buffer, opts: UploadFileOptions) {
    try {
      const fileName = await S3BucketClient.generateUploadFileName(opts.originalname);
      const objectKey = `${opts.prefixPath}/${fileName}`;
      const objectURL = this.getObjectURL(objectKey);
      await this.s3Client.putObject({
        Bucket: env.AWS_S3_BUCKET,
        Key: objectKey,
        ACL: 'public-read',
        CacheControl: 'public, max-age=31536000',
        Body: file,
      });
      this.logger.debug('success', '[uploadPublicFile:success]', objectURL);
      return { url: objectURL };
    } catch (err) {
      this.logger.error('error', '[uploadPublicFile:error]', err);
      throw err;
    }
  }
  async deleteFile(key: string) {
    try {
      await this.s3Client.deleteObject({
        Bucket: env.AWS_S3_BUCKET,
        Key: key,
      });
      this.logger.debug('success', '[deleteFile:success]', key);
      return { key };
    } catch (err) {
      this.logger.error('error', '[deleteFile:error]', err);
      throw err;
    }
  }

  /**
   * Get bucket name
   */
  get name() {
    return this.bucket;
  }
}
