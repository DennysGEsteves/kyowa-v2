import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { InjectableLogger } from '../../../util/logger/logger';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: InjectableLogger) {}

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.info(
      `[RequestContextMiddleware] (${req.method}) ${req.originalUrl} ${req.body ? `body: ${JSON.stringify(req.body)}` : ''}`,
    );
    next();
  }
}
