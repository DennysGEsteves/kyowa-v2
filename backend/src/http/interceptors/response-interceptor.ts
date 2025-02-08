import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomResponse } from '../response/custom-response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(map((response) => this.responseHandler(response, context)));
  }

  private responseHandler = (response: any, context: ExecutionContext) => {
    if (response instanceof CustomResponse) {
      const httpResponse = context.switchToHttp().getResponse();
      const { status, body } = response;
      this.httpAdapter.status(httpResponse, status);
      return body;
    }
    return response;
  };
}
