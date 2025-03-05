import { BadRequestException, Injectable } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { JwtService } from '@nestjs/jwt';
import { SigninDTO } from 'src/controllers/auth/dto';
import { AuthPresenter } from 'src/adapters/presenters/auth/auth.presenter';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: SigninDTO): Promise<{ access_token: string }> {
    const userDB = await this.userRepository.findByEmail(dto.email);
    if (userDB?.pass !== dto.password) {
      throw new BadRequestException('INVALID_CREDENTIALS');
    }

    const user = UserMapper.fromDB(userDB);
    const payload = { sub: userDB.id, user };

    const access_token = this.jwtService.sign(payload);

    return AuthPresenter.toSignInDTO(access_token);
  }
}
