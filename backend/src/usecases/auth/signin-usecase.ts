import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { SigninDTO } from 'src/controllers/auth/dtos';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { JwtService } from '@nestjs/jwt';
import { UserPresenter } from 'src/adapters/presenters/user';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: SigninDTO): Promise<{ access_token: string }> {
    const userDB = await this.userRepository.findByEmail(dto.email);
    if (userDB?.pass !== dto.password) {
      throw new UnauthorizedException();
    }

    const user = UserMapper.fromDB(userDB);
    const payload = { sub: userDB.id, user: UserPresenter.toSignIn(user) };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
