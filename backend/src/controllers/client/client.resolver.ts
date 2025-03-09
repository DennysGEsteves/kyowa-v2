import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientEntity } from 'src/entities';
import {
  CreateClientUseCase,
  GetClientsUseCase,
  UpdateClientUseCase,
} from 'src/usecases/client';
import { UpsertClientDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';
import { PaginationArgs } from '../../util/pagination/pagination-args';
import { GetClientsByPaginationResponse } from 'src/adapters/presenters/clients/dtos/get-clients-by-pagination';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class ClientResolver {
  constructor(
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
  ) {}

  @Query(() => [ClientEntity])
  async getClients(): Promise<ClientEntity[]> {
    return this.getClientsUseCase.execute();
  }

  @Query(() => GetClientsByPaginationResponse)
  async getClientsByPagination(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetClientsByPaginationResponse> {
    return this.getClientsUseCase.executeByPagination(paginationArgs);
  }

  @Mutation(() => ClientEntity)
  async createClient(
    @Args('input') input: UpsertClientDTO,
  ): Promise<ClientEntity> {
    return this.createClientUseCase.execute(input);
  }

  @Mutation(() => ClientEntity)
  async updateClient(
    @Args('input') input: UpsertClientDTO,
  ): Promise<ClientEntity> {
    return this.updateClientUseCase.execute(input);
  }
}
