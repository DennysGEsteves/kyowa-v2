import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
} from 'src/usecases/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserRepository } from 'src/repositories/user/user-repository';

@Module({
  providers: [
    UserResolver,
    CreateUserUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
