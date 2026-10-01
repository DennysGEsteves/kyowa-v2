import { Inject, Injectable } from '@nestjs/common';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';

@Injectable()
export class GetArchitectsUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  execute(): Promise<ArchitectEntity[]> {
    return this.architectRepository.findAll();
  }
}
