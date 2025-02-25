import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GlobalModule } from 'src/modules/global/global-module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from 'src/http/interceptors/response-interceptor';
import { ExceptionHandler } from '../http/exceptions/exception-handler';
import { RequestContextMiddleware } from 'src/http/middlewares/request-context/request-context-middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GlobalModule, AuthModule, UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppGraphQLModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
