import { Injectable } from '@nestjs/common';
import { ArchitectEntity } from 'src/entities';
import { ArchitectMapper } from 'src/adapters/mappers/architect';
import { IArchitectRepository } from 'src/repositories/architect/interfaces/i-architect-repository';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { GetArchitectsByPaginationResponse } from 'src/adapters/presenters/architects/dtos/get-architects-by-pagination';
import { GetArchitectsByNameResponse } from 'src/adapters/presenters/architects/dtos/get-architects-by-name';

@Injectable()
export class GetArchitectsUseCase {
  constructor(private readonly architectRepository: IArchitectRepository) {}

  async execute(): Promise<ArchitectEntity[]> {
    const architectsDB = await this.architectRepository.findAll();
    return ArchitectMapper.fromDBList(architectsDB);
  }

  async executeByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<GetArchitectsByPaginationResponse> {
    const res =
      await this.architectRepository.findAllByPagination(paginationArgs);

    const architects = ArchitectMapper.fromDBList(res.items);

    return {
      items: architects,
      meta: {
        total: res.total,
        page: paginationArgs.page,
        totalPages: Math.ceil(res.total / paginationArgs.limit),
      },
    };
  }

  async executeByName(name: string): Promise<GetArchitectsByNameResponse[]> {
    const architectsDB = await this.architectRepository.findAllByName(name);
    const architects = ArchitectMapper.fromDBList(architectsDB);

    return architects.map((architect) => ({
      mid: architect.mid,
      name: architect.name,
    }));
  }
}
