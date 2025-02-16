import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GetUsersDTO } from 'src/adapters/presenters/user/dtos/get-users-dto';
import { UserEntity } from 'src/entities';
import {
  CreateUserUseCase,
  InactiveUserUseCase,
  GetUsersUseCase,
  UpdateUserUseCase,
  ActiveUserUseCase,
} from 'src/usecases/user';
import { UpsertUserDTO } from './dto/upsert-user-dto';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly inactiveUserUseCase: InactiveUserUseCase,
    private readonly activeUserUseCase: ActiveUserUseCase,
  ) {}

  @Query(() => [GetUsersDTO])
  async getUsers(): Promise<GetUsersDTO[]> {
    return await this.getUsersUseCase.execute();
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
