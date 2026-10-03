import { Injectable, Scope } from '@nestjs/common';
import {
  createLogger,
  format,
  Logger as WinstonLoggerInstance,
  transports,
} from 'winston';
import { envs } from '../../config/envs';

type LogParams = Record<string, unknown> | Error;

@Injectable({ scope: Scope.REQUEST })
class WinstonLogger {
  logger: WinstonLoggerInstance;

  constructor() {
    this.logger = createLogger({
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
        }),
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
      silent: envs.ENV === 'TEST',
    });
  }

  public info(message: string, params?: LogParams) {
    return this.logger.info(message, params);
  }

  public debug(message: string, params?: LogParams) {
    return this.logger.debug(message, params);
  }

  public error(message: string, params?: LogParams) {
    return this.logger.error(message, params);
  }

  public warn(message: string, params?: LogParams) {
    return this.logger.warn(message, params);
  }
}

export { WinstonLogger as InjectableLogger };

export const Logger = new WinstonLogger();
