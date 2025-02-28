import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SigninDTOPresenter } from 'src/adapters/presenters/auth/dtos/signin.dto';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';
import { SigninDTO } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Mutation(() => SigninDTOPresenter)
  async signin(@Args('input') input: SigninDTO): Promise<SigninDTOPresenter> {
    return this.signInUseCase.execute(input);
  }
}
