import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GlobalModule } from 'src/modules/global/global-module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
    }),
    UserModule,
    GlobalModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppGraphQLModule {}
