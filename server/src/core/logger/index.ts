import { configure, getLogger, Logger as JSLogger } from 'log4js';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Configure logger
 */
configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 10 * 1024 * 1024, // Max log file size 10MB
      backups: 30, // Keep 30 backup files
      compress: false, // Compress the backups
      encoding: 'utf-8',
      mode: 0o0640,
      flags: 'w+',
    },
    dateFile: {
      type: 'dateFile',
      filename: 'logs/file.log',
      pattern: 'yyyy-MM-dd',
      compress: false,
    },
    out: {
      type: 'stdout',
    },
  },
  categories: {
    default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' },
  },
});

/**
 * Logger
 */
export default class Logger {
  private logger: JSLogger;

  constructor(category?: string, logLevel?: LogLevel) {
    this.logger = getLogger(category);
    if (logLevel) {
      this.logger.level = logLevel;
    }
  }

  trace(message: any, ...args: any[]): void {
    return this.logger.trace(message, ...args);
  }

  debug(message: any, ...args: any[]): void {
    return this.logger.debug(message, ...args);
  }

  info(message: any, ...args: any[]): void {
    return this.logger.info(`ℹ️ ${message}`, ...args);
  }

  success(message: any, ...args: any[]): void {
    return this.logger.info(`✅ ${message}`, ...args);
  }

  warn(message: any, ...args: any[]): void {
    return this.logger.warn(message, ...args);
  }

  error(message: any, ...args: any[]): void {
    return this.logger.error(`🔥 ${message}`, ...args);
  }

  fatal(message: any, ...args: any[]): void {
    return this.logger.fatal(`🔥 ${message}`, ...args);
  }

  mark(message: any, ...args: any[]): void {
    return this.logger.mark(message, ...args);
  }
}
