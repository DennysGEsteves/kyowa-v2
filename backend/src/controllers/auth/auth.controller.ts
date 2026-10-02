import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginUseCase } from '../../usecases/auth/login.usecase';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}
