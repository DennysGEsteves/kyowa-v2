import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import {
  CreateUserUseCase,
  InactiveUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  ActiveUserUseCase,
} from 'src/usecases/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserRepository } from 'src/repositories/user/user-repository';

@Module({
  providers: [
    UserResolver,
    CreateUserUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    InactiveUserUseCase,
    ActiveUserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
