import { Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/usecases/user';
import { UserController } from 'src/controllers/user/user-controller';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserRepository } from 'src/repositories/user/user-repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
  exports: [IUserRepository],
})
export class UserModule {}
