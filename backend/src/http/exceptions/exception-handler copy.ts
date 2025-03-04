/* eslint-disable complexity */
import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { Logger } from 'src/util/logger/logger'; // Certifique-se de que o caminho está correto
import { HttpException } from '@nestjs/common';

// Interface ajustada para ser compatível com Logger
interface GraphQLResponseObject {
  statusCode: number;
  message: string[];
  error: string;
  path?: string;
  stacktrace?: string;
  [key: string]: any; // Assinatura de índice para compatibilidade com Logger
}

@Catch()
export class GraphQLExceptionHandler implements GqlExceptionFilter {
  public catch(exception: Error, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = [exception.message];
    let showStackTrace = false;

    const errorResponse: GraphQLResponseObject = {
      statusCode: status,
      message,
      error: HttpStatus[status],
      path: info?.fieldName || 'unknown',
    };

    if (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientValidationError
    ) {
      const prismaExceptionInfo = PrismaService.errorExceptions(exception);
      status = prismaExceptionInfo.status;
      message = [prismaExceptionInfo.message];
    } else if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      status = exception.getStatus();
      message = [responseBody as string];
    } else {
      showStackTrace = true;
    }

    errorResponse.statusCode = status;
    errorResponse.message = message;
    errorResponse.error = HttpStatus[status];
    if (showStackTrace) {
      errorResponse.stacktrace = exception.stack;
    }

    // Log ajustado para compatibilidade
    Logger.error(
      '[GraphQLExceptionHandler] Exception information: ',
      errorResponse as Record<string, unknown>,
    );

    return new GraphQLError(
      message.join(', '),
      null,
      null,
      null,
      [errorResponse.path],
      null,
      {
        code: errorResponse.error.replace(' ', '_').toUpperCase(),
        status: errorResponse.statusCode,
        ...(showStackTrace ? { stacktrace: errorResponse.stacktrace } : {}),
      },
    );
  }
}

// Exporta a classe diretamente
export const graphQLExceptionHandler = new GraphQLExceptionHandler(); // Instância para uso global
