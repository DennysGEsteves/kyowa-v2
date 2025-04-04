import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { UserEntity } from 'src/entities';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: number): Promise<UserEntity> {
    const userDB = await this.userRepository.findById(userId);
    return UserMapper.fromDB(userDB);
  }
}
