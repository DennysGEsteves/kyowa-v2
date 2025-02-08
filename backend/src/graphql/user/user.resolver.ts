import { Resolver, Query } from '@nestjs/graphql';
import { GetUsersDTO } from 'src/adapters/presenters/user/dtos/get-users-dto';
import { UserEntity } from 'src/entities';
import { GetUsersUseCase } from 'src/usecases/user';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  @Query(() => [GetUsersDTO])
  async users(): Promise<GetUsersDTO[]> {
    return await this.getUsersUseCase.execute();
  }

  // @Mutation(() => UserEntity)
  // async createUser(@Args('input') input: CreateUserInput): Promise<UserEntity> {
  //   return this.createUserUseCase.execute(input);
  // }
}
