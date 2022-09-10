import { Container, Token } from 'typedi';

import Logger from '@/core/logger';
import env from '@/config/env';

export const DILogger = new Token<Logger>('LOGGER');

const loggerLoader = (): Logger => {
  const logger = new Logger('App', env.LOG_LEVEL);
  Container.set(DILogger, logger);
  logger.success('Logger loaded');

  return logger;
};

export default loggerLoader;
