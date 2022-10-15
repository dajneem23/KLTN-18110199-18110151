import { Inject, Service } from 'typedi';
import ms from 'ms';
import Logger from '@/core/logger';
import env from '@/config/env';
import { DIRedisClient } from '@/loaders/redisClientLoader';
import { RedisClientType } from 'redis';
import { REDIS_TEMPORARY_BLOCKLIST_KEY } from '@/modules/auth/auth.constant';

@Service()
export default class BlocklistService {
  private logger = new Logger('BlocklistService');

  constructor(@Inject(DIRedisClient) private redisClient: RedisClientType) {}

  /**
   * Add an account to the temporary blocklist
   */
  async addToTemporaryBlockList(userId: string) {
    try {
      const result = await this.redisClient.setEx(
        `${REDIS_TEMPORARY_BLOCKLIST_KEY}:${userId}`,
        ms(env.JWT_SECRET) / 1000, // Expires (seconds)
        'true',
      );
      this.logger.debug('[addToTemporaryBlockList:success]', { userId, result });
      return result;
    } catch (err) {
      this.logger.error('[addToTemporaryBlockList:error]', err.message);
      throw err;
    }
  }

  /**
   * Remove an account from the temporary blocklist
   */
  async removeFromTemporaryBlockList(userId: string) {
    try {
      const result = await this.redisClient.del(`${REDIS_TEMPORARY_BLOCKLIST_KEY}:${userId}`);
      this.logger.debug('[removeFromTemporaryBlockList:success]', { userId, result });
      return result;
    } catch (err) {
      this.logger.error('[removeFromTemporaryBlockList:error]', err.message);
      throw err;
    }
  }

  /**
   * Check if an account is on the temporary blocklist or not?
   */
  async isOnTemporaryBlockList(userId: string) {
    try {
      const result = await this.redisClient.get(`${REDIS_TEMPORARY_BLOCKLIST_KEY}:${userId}`);
      return !!result;
    } catch (err) {
      this.logger.error('[isOnTemporaryBlockList:error]', err.message);
      throw err;
    }
  }
}
