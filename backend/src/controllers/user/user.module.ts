import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import {
  CreateUserUseCase,
  InactiveUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  ActiveUserUseCase,
  GetUsersManagerUseCase,
  GetUserByIdUseCase,
} from 'src/usecases/user';
import { IUserRepository, UserRepository } from 'src/repositories/user';

@Module({
  providers: [
    UserResolver,
    CreateUserUseCase,
    GetUsersUseCase,
    GetUsersManagerUseCase,
    UpdateUserUseCase,
    InactiveUserUseCase,
    ActiveUserUseCase,
    GetUserByIdUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
