/* eslint-disable complexity */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Logger } from '../../shared/logger/logger';
import { LogicException } from './logic-exception.exception';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  public async catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response = ctx.getResponse();

    let message = [e.message];
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let showStackTrace = true;
    let data = null;

    if (e instanceof BadRequestException) {
      status = HttpStatus.BAD_REQUEST;
      showStackTrace = false;

      const responseBody = e.getResponse();
      if (typeof responseBody === 'object' && responseBody !== null) {
        const responseMessage = (responseBody as Record<string, unknown>)[
          'message'
        ] as string;
        message = Array.isArray(responseMessage)
          ? responseMessage
          : [responseMessage || e.message];
      } else if (typeof responseBody === 'string') {
        message = [responseBody];
      }
    } else if (e instanceof LogicException) {
      data = e.data;
    }

    const body = {
      statusCode: status,
      message,
      error:
        status === HttpStatus.BAD_REQUEST ? 'Bad Request' : HttpStatus[status],
      path: request.url,
      data,
      ...(showStackTrace ? { stacktrace: e.stack } : {}),
    };

    Logger.error('[ExceptionHandler] Exception information: ', body);
    response.status(status).json(body);
  }
}
