import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';
import { envs } from '../../config/envs';
import { UserEntity } from '../../entities/user';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.pass !== password || !user.active) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const secret = envs.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const tokenData = {
      id: user.id,
      email: user.email,
      name: user.name,
      permission: user.permission,
      storeId: user.storeId,
      active: user.active,
    } as UserEntity;

    const token = sign(tokenData, secret, {
      expiresIn: '1d',
    });

    return token;
  }
}
