import { getRuntimeEnv, parseJSONFromFile } from '../utils/common';
import { LogLevel } from '@/core/logger';

type AppEnv = 'local' | 'development' | 'production';

// Local env file path
const LOCAL_ENV_FILEPATH = './env.local.json';

/**
 * Loads ENV config
 */
(() => {
  let envConfig: { [key: string]: string };
  if (process.env.ENV_VARS) {
    // Load config variables from CI/CD server
    envConfig = JSON.parse(process.env.ENV_VARS);
  } else {
    // Load config variables from local file
    envConfig = parseJSONFromFile(LOCAL_ENV_FILEPATH);
  }
  if (typeof envConfig === 'object') {
    Object.keys(envConfig).forEach((key) => (process.env[key] = envConfig[key]));
  }
})();

/**
 * ENV config
 */
const env = {
  APP_ENV: getRuntimeEnv('APP_ENV') as AppEnv,
  APP_NAME: getRuntimeEnv('APP_NAME'),
  APP_VERSION: getRuntimeEnv('APP_VERSION'),
  APP_PORT: parseInt(getRuntimeEnv('APP_PORT'), 10),
  APP_HOST: getRuntimeEnv('APP_HOST'),
  API_PREFIX: getRuntimeEnv('API_PREFIX'),
  MONGO_URI: getRuntimeEnv('MONGO_URI'),

  REDIS_URI: getRuntimeEnv('REDIS_URI'),
  LOG_LEVEL: getRuntimeEnv('LOG_LEVEL') as LogLevel,
  JWT_SECRET: getRuntimeEnv('JWT_SECRET'),
  JWT_ACCESS_TOKEN_EXP: getRuntimeEnv('JWT_ACCESS_TOKEN_EXP'),
  JWT_REFRESH_TOKEN_EXP: getRuntimeEnv('JWT_REFRESH_TOKEN_EXP'),
  RESET_PASSWORD_TOKEN_EXP: getRuntimeEnv('RESET_PASSWORD_TOKEN_EXP'),
  VERIFY_EMAIL_TOKEN_EXP: getRuntimeEnv('VERIFY_EMAIL_TOKEN_EXP'),
  CONFIRM_REQUEST_TOKEN_EXP: getRuntimeEnv('CONFIRM_REQUEST_TOKEN_EXP'),
};

export default env;
