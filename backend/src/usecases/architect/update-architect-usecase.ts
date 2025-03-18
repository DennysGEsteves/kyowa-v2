import { Injectable, Scope } from '@nestjs/common';
import { ArchitectEntity } from 'src/entities';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';
import { UpsertArchitectDTO } from 'src/controllers/architect/dtos';

@Injectable({ scope: Scope.REQUEST })
export class UpdateArchitectUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(dto: UpsertArchitectDTO): Promise<ArchitectEntity> {
    const architect = ArchitectMapper.fromUpsertArchitectDTO(dto);
    const architectDB = await this.architectRepository.update(architect);
    return ArchitectMapper.fromDB(architectDB);
  }
}
