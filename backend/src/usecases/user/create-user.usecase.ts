import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';
import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const user = UserEntity.fromCreateUserDto(dto);
    return this.userRepository.create(user);
  }
}
