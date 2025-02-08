import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { UserMapper } from 'src/adapters/mappers/user';
import { UpsertUserDTO } from 'src/controllers/user/dtos';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
// import { REQUEST } from '@nestjs/core';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    // @Inject(REQUEST) private readonly request: Request,
  ) {}

  async execute(dto: UpsertUserDTO): Promise<UserEntity> {
    const newUser = UserMapper.fromUpsertUserDTO(dto);
    const userDB = await this.userRepository.create(newUser);
    return UserMapper.fromDB(userDB);
  }
}
