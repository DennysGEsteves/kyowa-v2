/* eslint-disable complexity */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { Logger } from 'src/util/logger/logger';
interface ResponseObject {
  statusCode: number;
  message: Array<string>;
  error: string;
}

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  public catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response = ctx.getResponse();
    let body = {};
    let message = [e.message];
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let showStackTrace = false;

    if (
      e instanceof Prisma.PrismaClientKnownRequestError ||
      e instanceof Prisma.PrismaClientValidationError
    ) {
      const prismaExceptionInfo = PrismaService.errorExceptions(e);
      status = prismaExceptionInfo.status;
      message = prismaExceptionInfo.message;
    } else if (e instanceof HttpException) {
      const responseBody = e.getResponse() as string | ResponseObject;
      status = e.getStatus();
      message =
        typeof responseBody === 'string'
          ? [responseBody]
          : responseBody.message;
    } else {
      showStackTrace = true;
    }

    body = {
      statusCode: status,
      message,
      error: HttpStatus[status],
      path: request.url,
      ...(showStackTrace ? { stacktrace: e.stack } : {}),
    };

    Logger.error('[ExceptionHandler] Exception information: ', body);
    response.status(status).json(body);
  }
}
