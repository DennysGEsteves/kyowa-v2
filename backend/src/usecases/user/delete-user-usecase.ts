import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/repositories/user/interfaces/i-user-repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<void> {
    return this.userRepository.delete(userId);
  }
}
