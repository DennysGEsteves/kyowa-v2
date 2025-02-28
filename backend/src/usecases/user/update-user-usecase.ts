import { Injectable, Scope } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { UserMapper } from 'src/adapters/mappers/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UpsertUserDTO } from 'src/controllers/user/dto';

@Injectable({ scope: Scope.REQUEST })
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: UpsertUserDTO): Promise<UserEntity> {
    const user = UserMapper.fromUpsertUserDTO(dto);
    await this.userRepository.update(user);
    return user;
  }
}
