import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { RoleType } from 'src/entities/user/types';
import { UserEntity } from 'src/entities';

@Injectable()
export class GetUsersManagerUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const usersDB = await this.userRepository.findAllByRole(RoleType.MANAGER);
    return UserMapper.fromDBList(usersDB);
  }
}
