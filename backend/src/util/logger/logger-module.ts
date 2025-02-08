import { Global, Module } from '@nestjs/common';
import { InjectableLogger } from './logger';

@Global()
@Module({
  controllers: [],
  providers: [InjectableLogger],
  exports: [InjectableLogger],
})
export class LoggerModule {}
