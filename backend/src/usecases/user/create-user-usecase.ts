import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities';
import { UserMapper } from 'src/adapters/mappers/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UpsertUserDTO } from 'src/graphql/user/dto';
// import { REQUEST } from '@nestjs/core';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    // @Inject(REQUEST) private readonly request: Request,
  ) {}

  async execute(dto: UpsertUserDTO): Promise<UserEntity> {
    const newUser = UserMapper.fromUpsertUserDTO(dto);
    console.log(11111);
    const userDB = await this.userRepository.create(newUser);
    console.log(22222);
    return UserMapper.fromDB(userDB);
  }
}
