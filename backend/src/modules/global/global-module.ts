import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { InjectableLogger } from 'src/util/logger/logger';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
  ],
  controllers: [],
  providers: [PrismaService, InjectableLogger],
  exports: [PrismaService, InjectableLogger],
})
export class GlobalModule {}
