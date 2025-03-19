import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SupplierEntity } from 'src/entities';
import {
  CreateSupplierUseCase,
  GetSuppliersUseCase,
  UpdateSupplierUseCase,
} from 'src/usecases/supplier';
import { UpsertSupplierDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';
import { PaginationArgs } from '../../util/pagination/pagination-args';
import { GetSuppliersByPaginationResponse } from 'src/adapters/presenters/suppliers/dtos/get-suppliers-by-pagination';
import { GetSuppliersByNameResponse } from 'src/adapters/presenters/suppliers/dtos/get-suppliers-by-name';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class SupplierResolver {
  constructor(
    private readonly getSuppliersUseCase: GetSuppliersUseCase,
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
  ) {}

  @Query(() => [SupplierEntity])
  async getSuppliers(): Promise<SupplierEntity[]> {
    return this.getSuppliersUseCase.execute();
  }

  @Query(() => GetSuppliersByPaginationResponse)
  async getSuppliersByPagination(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetSuppliersByPaginationResponse> {
    return this.getSuppliersUseCase.executeByPagination(paginationArgs);
  }

  @Query(() => [GetSuppliersByNameResponse])
  async getSuppliersByName(
    @Args('name') name: string,
  ): Promise<GetSuppliersByNameResponse[]> {
    return this.getSuppliersUseCase.executeByName(name);
  }

  @Mutation(() => SupplierEntity)
  async createSupplier(
    @Args('input') input: UpsertSupplierDTO,
  ): Promise<SupplierEntity> {
    return this.createSupplierUseCase.execute(input);
  }

  @Mutation(() => SupplierEntity)
  async updateSupplier(
    @Args('input') input: UpsertSupplierDTO,
  ): Promise<SupplierEntity> {
    return this.updateSupplierUseCase.execute(input);
  }
}
