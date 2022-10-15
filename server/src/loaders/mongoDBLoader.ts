import { Db, MongoClient } from 'mongodb';
import { Container, Token } from 'typedi';

import { DILogger } from '@/loaders/loggerLoader';
import env from '@/config/env';

export const DIMongoDB = new Token<Db>('mongoDB');
export const DIMongoClient = new Token<MongoClient>('mongoClient');

const mongoDBLoader = async (): Promise<Db> => {
  const logger = Container.get(DILogger);

  const client = await MongoClient.connect(env.MONGO_URI);
  client.on('disconnected', () => logger.warn('MongoDB disconnected'));
  client.on('reconnected', () => logger.success('MongoDB reconnected'));
  const db = client.db();
  Container.set(DIMongoClient, client);
  Container.set(DIMongoDB, db);
  logger.success('MongoDB connected');

  return db;
};

export default mongoDBLoader;
