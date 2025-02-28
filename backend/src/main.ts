import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppGraphQLModule } from './modules/graphql.module';

async function bootstrap() {
  const app = await NestFactory.create(AppGraphQLModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
