import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPermission } from '../../entities/user/types/user-permission';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
  permission: UserPermission;
  storeId: number;
  active: boolean;
};

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<AuthenticatedUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || user.pass !== password || !user.active) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      permission: user.permission,
      storeId: user.storeId,
      active: user.active,
    };
  }
}
