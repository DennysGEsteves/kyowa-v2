/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
// import { RequestContext } from 'models/request-context';
import * as winston from 'winston';

const formats = [winston.format.json()];

// const hasNewRelic = () =>
//   process.env.ENV && process.env.ENV !== 'LOCAL' && process.env.ENV !== 'TEST';

// if (hasNewRelic()) {
//   const newrelicFormatter = require('@newrelic/winston-enricher');
//   formats.push(newrelicFormatter());
// }

type LogParams = Record<string, unknown> | Error;

@Injectable({ scope: Scope.REQUEST })
class WinstonLogger {
  logger: winston.Logger;

  constructor(@Inject(REQUEST) private readonly request?: Request) {
    this.logger = winston.createLogger({
      format: winston.format.combine(...formats),
      transports: [
        new winston.transports.Console({
          level: 'debug',
        }),
      ],
      silent: process.env.ENV === 'TEST',
    });
  }

  public info(message: string, params?: LogParams) {
    return this.logger.info(message, {
      ...params,
      // ...this.getRequestContextLogData(this.request?.context),
    });
  }

  public debug(message: string, params?: LogParams) {
    return this.logger.debug(message, {
      ...params,
      // ...this.getRequestContextLogData(this.request?.context),
    });
  }

  public error(message: string, params?: LogParams) {
    return this.logger.error(message, {
      ...params,
      // ...this.getRequestContextLogData(this.request?.context),
    });
  }

  public warn(message: string, params?: LogParams) {
    return this.logger.warn(message, {
      ...params,
      // ...this.getRequestContextLogData(this.request?.context),
    });
  }

  // public getRequestContextLogData = (
  //   requestContext?: RequestContext,
  // ): Record<string, any> => {
  //   return requestContext
  //     ? {
  //         requestTraceId: requestContext.requestTraceId,
  //         baseUrl: requestContext.baseUrl,
  //         originalUrl: requestContext.originalUrl,
  //         zone: requestContext.zone,
  //         env: requestContext.env,
  //         vendorId: requestContext.vendorData?.vendorId,
  //         clientType: requestContext.clientType,
  //         clientEmail:
  //           requestContext.loggedUserInfo?.email ||
  //           requestContext.legacyRequestData?.dataMassUserEmail,
  //         // TODO: Remove the following `requestContext` block only when this retro-compatible data can be forgotten
  //         requestContextInfo: {
  //           zone: requestContext.zone,
  //           env: requestContext.env,
  //           loggedUserInfo: requestContext.loggedUserInfo,
  //           legacyRequestData: requestContext.legacyRequestData,
  //         },
  //       }
  //     : undefined;
  // };
}

export { WinstonLogger as InjectableLogger };

export const Logger = new WinstonLogger();
