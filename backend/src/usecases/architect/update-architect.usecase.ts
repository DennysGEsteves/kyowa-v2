import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateArchitectDto } from '../../controllers/architect/dto/update-architect.dto';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class UpdateArchitectUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(id: string, dto: UpdateArchitectDto): Promise<ArchitectEntity> {
    const architect = await this.architectRepository.findById(id);
    if (!architect) {
      throw new NotFoundException('Arquiteto não encontrado');
    }

    const updatedEntity = ArchitectEntity.fromUpdateArchitectDto(
      architect,
      dto,
    );
    const updated = await this.architectRepository.update(id, updatedEntity);
    if (!updated) {
      throw new NotFoundException('Arquiteto não encontrado');
    }
    return updated;
  }
}
