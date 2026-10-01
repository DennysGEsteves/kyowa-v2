import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
  UpdateArchitectData,
} from '../../repositories/architect/interfaces/i-architect-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class UpdateArchitectUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(id: string, data: UpdateArchitectData): Promise<ArchitectEntity> {
    const architect = await this.architectRepository.findById(id);
    if (!architect) {
      throw new NotFoundException('Arquiteto não encontrado');
    }

    const payload: UpdateArchitectData = { ...data };

    if (data.name !== undefined && data.nameFilter === undefined) {
      payload.nameFilter = toNameFilter(data.name);
    }

    const updated = await this.architectRepository.update(id, payload);
    if (!updated) {
      throw new NotFoundException('Arquiteto não encontrado');
    }
    return updated;
  }
}
