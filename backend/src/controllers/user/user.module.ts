import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import {
  CreateUserUseCase,
  InactiveUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  ActiveUserUseCase,
  GetUsersManagerUseCase,
} from 'src/usecases/user';
import { IUserRepository, UserRepository } from 'src/repositories/user';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    UserResolver,
    CreateUserUseCase,
    GetUsersUseCase,
    GetUsersManagerUseCase,
    UpdateUserUseCase,
    InactiveUserUseCase,
    ActiveUserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
