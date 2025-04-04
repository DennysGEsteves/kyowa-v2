import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/entities';
import {
  CreateUserUseCase,
  InactiveUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  ActiveUserUseCase,
  GetUsersManagerUseCase,
  GetUserByIdUseCase,
} from 'src/usecases/user';
import { UpsertUserDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class UserResolver {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUsersManagerUseCase: GetUsersManagerUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly inactiveUserUseCase: InactiveUserUseCase,
    private readonly activeUserUseCase: ActiveUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  @Query(() => [UserEntity])
  async getUsers(): Promise<UserEntity[]> {
    return await this.getUsersUseCase.execute();
  }

  @Roles(RoleType.LOGGED)
  @Query(() => UserEntity)
  async getUserById(@Args('id') id: number): Promise<UserEntity> {
    return await this.getUserByIdUseCase.execute(id);
  }

  @Roles(RoleType.LOGGED)
  @Query(() => [UserEntity])
  async getUsersManager(): Promise<UserEntity[]> {
    return await this.getUsersManagerUseCase.execute();
  }

  @Mutation(() => UserEntity)
  async createUser(@Args('input') input: UpsertUserDTO): Promise<UserEntity> {
    return this.createUserUseCase.execute(input);
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('input') input: UpsertUserDTO): Promise<UserEntity> {
    return this.updateUserUseCase.execute(input);
  }

  @Mutation(() => Boolean)
  async inactiveUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    await this.inactiveUserUseCase.execute(userId);
    return true;
  }

  @Mutation(() => Boolean)
  async activeUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    await this.activeUserUseCase.execute(userId);
    return true;
  }
}
