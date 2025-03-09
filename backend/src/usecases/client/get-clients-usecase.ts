import { Injectable } from '@nestjs/common';
import { ClientEntity } from 'src/entities';
import { ClientMapper } from 'src/adapters/mappers/client';
import { IClientRepository } from 'src/repositories/client/interfaces/i-client-repository';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { GetClientsByPaginationResponse } from 'src/adapters/presenters/clients/dtos/get-clients-by-pagination';

@Injectable()
export class GetClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    const clientsDB = await this.clientRepository.findAll();
    return ClientMapper.fromDBList(clientsDB);
  }

  async executeByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<GetClientsByPaginationResponse> {
    const res = await this.clientRepository.findAllByPagination(paginationArgs);

    const clients = ClientMapper.fromDBList(res.items);

    return {
      items: clients,
      meta: {
        total: res.total,
        page: paginationArgs.page,
        totalPages: Math.ceil(res.total / paginationArgs.limit),
      },
    };
  }
}
