import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LoginUseCase } from '../../usecases/auth/login.usecase';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
