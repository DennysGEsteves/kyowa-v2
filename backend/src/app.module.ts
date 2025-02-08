import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user-module';
import { GlobalModule } from './modules/global/global-module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHandler } from './http/exceptions/exception-handler';
import { ResponseInterceptor } from './http/interceptors/response-interceptor';
import { RequestContextMiddleware } from './http/middlewares/request-context/request-context-middleware';
import { AuthModule } from './modules/global/auth-module';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './modules/store-module';
import { ArchitectModule } from './modules/architect-module';
import { ClientModule } from './modules/client-module';
import { SupplierModule } from './modules/supplier-module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    // UserModule,
    // StoreModule,
    // ArchitectModule,
    // ClientModule,
    // SupplierModule,
  ],
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
