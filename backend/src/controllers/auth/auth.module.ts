import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserRepository } from 'src/repositories/user/user-repository';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [
    AuthResolver,
    SignInUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class AuthModule {}
