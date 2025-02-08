import { Injectable } from '@nestjs/common';
import { UserMapper } from 'src/adapters/mappers/user';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';
import { UserPresenter } from 'src/adapters/presenters/user';
import { GetUsersDTO } from 'src/adapters/presenters/user/dtos/get-users-dto';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<GetUsersDTO[]> {
    const usersDB = await this.userRepository.findAll();
    const users = UserMapper.fromDBList(usersDB);
    return UserPresenter.toGetUsersDTO(users);
  }
}
