import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArchitectModule } from './controllers/architect/architect.module';
import { ClientModule } from './controllers/client/client.module';
import { ProductsModule } from './controllers/products.module';
import { ProviderModule } from './controllers/provider/provider.module';
import { SealModule } from './controllers/seal/seal.module';
import { StockModule } from './controllers/stock/stock.module';
import { StoreModule } from './controllers/store/store.module';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './controllers/user/user.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionHandler } from './http/exceptions/exception-handler';
import { RequestMiddleware } from './http/middlewares/request/request-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProviderModule,
    ClientModule,
    ArchitectModule,
    StoreModule,
    SealModule,
    StockModule,
    ProductsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .exclude('health', 'actuator/info', 'env-var', {
        path: 'auth/login',
        method: RequestMethod.POST,
      })
      .forRoutes('*');
    // consumer
    //   .apply(RequestContextValidationMiddleware)
    //   .exclude('configs/(.*)', 'health', 'actuator/info', 'env-var', 'vendors')
    //   .forRoutes('*');
  }
}
