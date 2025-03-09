import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { InjectableLogger } from 'src/util/logger/logger';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      context: ({ req }) => ({ req }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importa o ConfigModule para injetar o ConfigService
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET não está definido no ambiente!');
        }
        return {
          secret,
          signOptions: { expiresIn: '10h' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PrismaService, InjectableLogger, JwtService],
  exports: [PrismaService, InjectableLogger, JwtModule],
})
export class GlobalModule {}
