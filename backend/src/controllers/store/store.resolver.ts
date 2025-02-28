import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StoreEntity } from 'src/entities';
import {
  CreateStoreUseCase,
  GetStoresUseCase,
  UpdateStoreUseCase,
} from 'src/usecases/store';
import { UpsertStoreDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';
import { GetStoresDTOPresenter } from 'src/adapters/presenters/store/dtos/get-stores.dto';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class StoreResolver {
  constructor(
    private readonly getStoresUseCase: GetStoresUseCase,
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
  ) {}

  @Query(() => [GetStoresDTOPresenter])
  async getStores(): Promise<GetStoresDTOPresenter[]> {
    const stores = await this.getStoresUseCase.execute();
    // console.log(stores);
    return stores;
  }

  @Mutation(() => StoreEntity)
  async createStore(
    @Args('input') input: UpsertStoreDTO,
  ): Promise<StoreEntity> {
    console.log(input);
    return this.createStoreUseCase.execute(input);
  }

  @Mutation(() => StoreEntity)
  async updateStore(
    @Args('input') input: UpsertStoreDTO,
  ): Promise<StoreEntity> {
    return this.updateStoreUseCase.execute(input);
  }
}
