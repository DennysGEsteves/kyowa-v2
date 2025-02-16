import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';

@Injectable()
export class ActiveUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: number): Promise<void> {
    return this.userRepository.changeActiveValue(userId, true);
  }
}
