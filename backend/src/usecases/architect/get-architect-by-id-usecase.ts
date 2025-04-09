import { Injectable } from '@nestjs/common';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { ArchitectEntity } from 'src/entities';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class GetArchitectByIdUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(architectId: number): Promise<ArchitectEntity> {
    const architectDB = await this.architectRepository.findById(architectId);
    return ArchitectMapper.fromDB(architectDB);
  }
}
