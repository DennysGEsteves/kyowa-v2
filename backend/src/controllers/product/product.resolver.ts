import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductEntity } from 'src/entities';
import {
  CreateProductUseCase,
  GetProductsUseCase,
  UpdateProductUseCase,
  GetProductByIdUseCase,
} from 'src/usecases/product';
import { UpsertProductDTO } from './dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';
import { PaginationArgs } from '../../util/pagination/pagination-args';
import { GetProductsByPaginationResponse } from 'src/adapters/presenters/products/dtos/get-products-by-pagination';
import { GetProductsByNameResponse } from 'src/adapters/presenters/products/dtos/get-products-by-name';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class ProductResolver {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
  ) {}

  @Query(() => [ProductEntity])
  async getProducts(): Promise<ProductEntity[]> {
    return this.getProductsUseCase.execute();
  }

  @Query(() => GetProductsByPaginationResponse)
  async getProductsByPagination(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<GetProductsByPaginationResponse> {
    return this.getProductsUseCase.executeByPagination(paginationArgs);
  }

  @Query(() => [GetProductsByNameResponse])
  async getProductsByName(
    @Args('name') name: string,
  ): Promise<GetProductsByNameResponse[]> {
    return this.getProductsUseCase.executeByName(name);
  }

  @Roles(RoleType.LOGGED)
  @Query(() => ProductEntity)
  async getProductById(@Args('id') id: number): Promise<ProductEntity> {
    return await this.getProductByIdUseCase.execute(id);
  }

  @Mutation(() => ProductEntity)
  async createProduct(
    @Args('input') input: UpsertProductDTO,
  ): Promise<ProductEntity> {
    return this.createProductUseCase.execute(input);
  }

  @Mutation(() => ProductEntity)
  async updateProduct(
    @Args('input') input: UpsertProductDTO,
  ): Promise<ProductEntity> {
    return this.updateProductUseCase.execute(input);
  }
}
