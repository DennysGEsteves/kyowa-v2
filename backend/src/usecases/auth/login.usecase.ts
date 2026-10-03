import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';
import { UserEntity } from '../../entities/user';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.pass !== password || !user.active) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return user;
  }
}
