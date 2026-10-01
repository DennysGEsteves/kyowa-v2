import { Inject, Injectable } from '@nestjs/common';
import { ArchitectEntity } from '../../entities/architect';
import {
  ARCHITECT_REPOSITORY,
  CreateArchitectData,
  IArchitectRepository,
} from '../../repositories/architect/interfaces/i-architect-repository';
import { toNameFilter } from '../../util/string/name-filter';

@Injectable()
export class CreateArchitectUseCase {
  constructor(
    @Inject(ARCHITECT_REPOSITORY)
    private readonly architectRepository: IArchitectRepository,
  ) {}

  async execute(data: CreateArchitectData): Promise<ArchitectEntity> {
    const nameFilter = data.nameFilter?.trim()
      ? data.nameFilter
      : toNameFilter(data.name);

    return this.architectRepository.create({
      ...data,
      nameFilter,
    });
  }
}
