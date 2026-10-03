import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { RequestContextMiddlewareHandler } from './request-context-middleware-handler';
import { Logger } from '../../../shared/logger/logger';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (RequestContextMiddlewareHandler.shouldBuildContext(req)) {
      req.user = RequestContextMiddlewareHandler.handle(req);
    }
    Logger.info(
      `[RequestMiddleware] (${req.method}) ${req.originalUrl} ${JSON.stringify(req.body)}`,
    );
    next();
  }
}
