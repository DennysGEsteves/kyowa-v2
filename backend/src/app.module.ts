import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArchitectModule } from './controllers/architect/architect.module';
import { ClientModule } from './controllers/client/client.module';
import { ProductsModule } from './controllers/products.module';
import { ProviderModule } from './controllers/provider/provider.module';
import { StoreModule } from './controllers/store/store.module';
import { UserModule } from './controllers/user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    ProviderModule,
    ClientModule,
    ArchitectModule,
    StoreModule,
    ProductsModule,
  ],
})
export class AppModule {}
