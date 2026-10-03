import { Inject, Injectable } from '@nestjs/common';
import { CreateArchitectDto } from '../../controllers/architect/dto/create-architect.dto';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class CreateArchitectUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(dto: CreateArchitectDto): Promise<ArchitectEntity> {
    const architect = ArchitectEntity.fromCreateArchitectDto(dto);
    return this.architectRepository.create(architect);
  }
}
