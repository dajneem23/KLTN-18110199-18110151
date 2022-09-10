import { createClient, RedisClientType } from 'redis';
import { Container, Token } from 'typedi';
import { DILogger } from '@/loaders/loggerLoader';
import env from '@/config/env';

export const DIRedisClient = new Token<RedisClientType>('redisClient');

export const redisClientLoader = async () => {
  const logger = Container.get(DILogger);

  // Create client
  const client = createClient({ url: env.REDIS_URI });

  // Listeners
  client.on('connect', () => logger.success('Redis Client connected'));
  client.on('error', (err) => logger.error('Redis Client error', err));
  client.on('reconnecting', () => logger.warn('Redis Client is reconnecting'));

  // Connect
  await client.connect();
  Container.set(DIRedisClient, client);

  return client;
};

export default redisClientLoader;
