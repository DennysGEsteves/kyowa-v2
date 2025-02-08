import { Body, Controller, Post } from '@nestjs/common';
import { SigninDTO } from './dtos';
import { SignInUseCase } from 'src/usecases/auth/signin-usecase';

@Controller('auth')
export class AuthController {
  constructor(private readonly signinUseCase: SignInUseCase) {}

  @Post('/signin')
  public async signin(@Body() dto: SigninDTO) {
    return this.signinUseCase.execute(dto);
  }
}
