import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user';
import {
  CreateUserData,
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(data: CreateUserData): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }
    return this.userRepository.create(data);
  }
}
