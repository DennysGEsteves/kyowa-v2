import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from '../../entities/user';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';
import { UpdateUserDto } from '../../controllers/user/dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException('E-mail já cadastrado');
      }
    }

    const newUser = UserEntity.fromUpdateUserDto(user, dto);
    const updated = await this.userRepository.update(id, newUser);
    if (!updated) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return updated;
  }
}
