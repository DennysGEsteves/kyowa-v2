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
    UpdateUserUseCase,
    InactiveUserUseCase,
    ActiveUserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
