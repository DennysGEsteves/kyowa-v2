import { Inject, Injectable } from '@nestjs/common';
import { ListClientsPaginatedQueryDto } from '../../controllers/client/dto/list-clients-query.dto';
import { ClientEntity } from '../../entities/client';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../../repositories/client/interfaces/i-client-repository';
import { PaginatedResult } from '../../types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListClientsPaginatedUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(
    query: ListClientsPaginatedQueryDto,
  ): Promise<PaginatedResult<ClientEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const name = query.name?.trim();
    const cpf = query.cpf?.trim();

    return this.clientRepository.findPaginated(
      {
        name: name || undefined,
        cpf: cpf || undefined,
        active: query.active,
      },
      { page, limit },
    );
  }
}
