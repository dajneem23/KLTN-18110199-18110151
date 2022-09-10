import { MongoClient } from 'mongodb';
import { Inject, Service } from 'typedi';
import { DIMongoClient } from '@/loaders/mongoDBLoader';
import { DILogger } from '@/loaders/loggerLoader';
import Logger from '@/core/logger';
import { EmailSubscription } from './emailSubscription.type';

const COLLECTION_NAME = 'email_subscriptions';

@Service()
export default class EmailSubscriptionModel {
  private readonly _collection;

  constructor(@Inject(DILogger) private logger: Logger, @Inject(DIMongoClient) private client: MongoClient) {
    this._collection = client.db().collection<EmailSubscription>(COLLECTION_NAME);
    Promise.all([
      // Unique ID
    ]).catch((err) => {
      this.logger.error(err);
    });
  }

  get collection() {
    return this._collection;
  }

  get mongoClient() {
    return this.client;
  }
}
