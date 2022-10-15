import { Db } from 'mongodb';
import { Inject, Service } from 'typedi';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { AuthSession } from '@/modules/auth/authSession.type';

export const COLLECTION_NAME = 'auth-sessions';

@Service()
export default class AuthSessionModel {
  private readonly _collection;

  constructor(@Inject(DILogger) private logger: Logger, @Inject(DIMongoDB) private db: Db) {
    this._collection = db.collection<AuthSession>(COLLECTION_NAME);
    Promise.all([this._collection.createIndex('expires', { expireAfterSeconds: 0 })]).catch((err) => {
      this.logger.error(err);
    });
  }

  get collection() {
    return this._collection;
  }
}
