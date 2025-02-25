import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';
import { SigninDTO } from './dto';
import { SignInResponse } from './dto/signin.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Mutation(() => SignInResponse)
  async signin(@Args('input') input: SigninDTO): Promise<SignInResponse> {
    return this.signInUseCase.execute(input);
  }
}
