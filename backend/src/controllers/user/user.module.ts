import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_REPOSITORY } from '../../repositories/user/interfaces/i-user-repository';
import { User, UserSchema } from '../../repositories/user/schemas/user.schema';
import { UserRepository } from '../../repositories/user/user.repository';
import { CreateUserUseCase } from '../../usecases/user/create-user.usecase';
import { DeleteUserUseCase } from '../../usecases/user/delete-user.usecase';
import { GetUserByIdUseCase } from '../../usecases/user/get-user-by-id.usecase';
import { GetUsersUseCase } from '../../usecases/user/get-users.usecase';
import { UpdateUserUseCase } from '../../usecases/user/update-user.usecase';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    CreateUserUseCase,
    GetUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
