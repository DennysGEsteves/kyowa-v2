import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { UserEntity } from 'src/entities';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const usersDB = await this.userRepository.findAll();
    return UserMapper.fromDBList(usersDB);
  }
}
