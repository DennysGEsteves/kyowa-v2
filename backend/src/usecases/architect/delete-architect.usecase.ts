import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class DeleteArchitectUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.architectRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Arquiteto não encontrado');
    }
  }
}
