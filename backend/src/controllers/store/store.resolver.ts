import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreEntity } from 'src/entities';
import {
  CreateStoreUseCase,
  GetStoresUseCase,
  UpdateStoreUseCase,
  GetStoreByIdUseCase,
} from 'src/usecases/store';
import { UpsertStoreDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class StoreResolver {
  constructor(
    private readonly getStoresUseCase: GetStoresUseCase,
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly getStoreByIdUseCase: GetStoreByIdUseCase,
  ) {}

  @Roles(RoleType.LOGGED)
  @Query(() => [StoreEntity])
  async getStores(): Promise<StoreEntity[]> {
    return this.getStoresUseCase.execute();
  }

  @Roles(RoleType.LOGGED)
  @Query(() => StoreEntity)
  async getStoreById(@Args('id') id: number): Promise<StoreEntity> {
    return await this.getStoreByIdUseCase.execute(id);
  }

  @Mutation(() => StoreEntity)
  async createStore(
    @Args('input') input: UpsertStoreDTO,
  ): Promise<StoreEntity> {
    return this.createStoreUseCase.execute(input);
  }

  @Mutation(() => StoreEntity)
  async updateStore(
    @Args('input') input: UpsertStoreDTO,
  ): Promise<StoreEntity> {
    return this.updateStoreUseCase.execute(input);
  }
}
