import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class GetArchitectByIdUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(id: string): Promise<ArchitectEntity> {
    const architect = await this.architectRepository.findById(id);
    if (!architect) {
      throw new NotFoundException('Arquiteto não encontrado');
    }
    return architect;
  }
}
