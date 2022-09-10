import { Db } from 'mongodb';
import { Inject, Service } from 'typedi';
import { DIMongoDB } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { User } from './user.type';

const COLLECTION_NAME = 'users';

@Service()
export class UserModel {
  private readonly _collection;

  constructor(@Inject(DILogger) private logger: Logger, @Inject(DIMongoDB) private db: Db) {
    this._collection = db.collection<User>(COLLECTION_NAME);
    Promise.all([
      // Unique ID

      // Unique Email
      this._collection.createIndex('email', { unique: false }),
    ]).catch((err) => {
      this.logger.error(err);
    });
  }

  get collection() {
    return this._collection;
  }
}
