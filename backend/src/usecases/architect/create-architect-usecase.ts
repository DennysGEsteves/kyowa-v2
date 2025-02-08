import { Injectable } from '@nestjs/common';
import { ArchitectEntity } from 'src/entities';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { UpsertArchitectDTO } from 'src/controllers/architect/dtos';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class CreateArchitectUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(dto: UpsertArchitectDTO): Promise<ArchitectEntity> {
    const newArchitect = ArchitectMapper.fromUpsertArchitectDTO(dto);
    const architectDB = await this.architectRepository.create(newArchitect);
    return ArchitectMapper.fromDB(architectDB);
  }
}
