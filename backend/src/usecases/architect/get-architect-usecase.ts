import { Injectable } from '@nestjs/common';
import { ArchitectEntity } from 'src/entities';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class GetArchitectsUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(): Promise<ArchitectEntity[]> {
    const architectsDB = await this.architectRepository.findAll();
    return ArchitectMapper.fromDBList(architectsDB);
  }
}
