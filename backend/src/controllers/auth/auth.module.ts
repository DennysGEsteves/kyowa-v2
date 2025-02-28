import { Module } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserRepository } from 'src/repositories/user/user-repository';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthResolver,
    SignInUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class AuthModule {}
