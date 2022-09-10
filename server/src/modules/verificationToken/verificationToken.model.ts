import { Db } from 'mongodb';
import { Inject, Service } from 'typedi';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { VerificationToken } from '@/modules/verificationToken/verificationToken.type';

const COLLECTION_NAME = 'verification-tokens';

@Service()
export default class VerificationTokenModel {
  private readonly _collection;

  constructor(@Inject(DILogger) private logger: Logger, @Inject(DIMongoDB) private db: Db) {
    this._collection = db.collection<VerificationToken>(COLLECTION_NAME);
    Promise.all([this._collection.createIndex('expires', { expireAfterSeconds: 0 })]).catch((err) => {
      this.logger.error(err);
    });
  }

  get collection() {
    return this._collection;
  }
}
