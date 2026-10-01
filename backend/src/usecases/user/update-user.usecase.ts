import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../../entities/user';
import {
  IUserRepository,
  UpdateUserData,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, data: UpdateUserData): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.email && data.email !== user.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    const updated = await this.userRepository.update(id, data);
    if (!updated) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return updated;
  }
}
