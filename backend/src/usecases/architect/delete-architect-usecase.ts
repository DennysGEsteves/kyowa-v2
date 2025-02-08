import { Injectable } from '@nestjs/common';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class DeleteArchitectUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(architectId: string): Promise<void> {
    return this.architectRepository.delete(architectId);
  }
}
