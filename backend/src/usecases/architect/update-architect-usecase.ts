import { Injectable, Scope } from '@nestjs/common';
import { ArchitectEntity } from 'src/entities';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { UpsertArchitectDTO } from 'src/controllers/architect/dtos';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';

@Injectable({ scope: Scope.REQUEST })
export class UpdateArchitectUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(
    dto: UpsertArchitectDTO,
    architectId: number,
  ): Promise<ArchitectEntity> {
    const architect = ArchitectMapper.fromUpsertArchitectDTO(dto, architectId);
    await this.architectRepository.update(architect);
    return architect;
  }
}
