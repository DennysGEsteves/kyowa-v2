import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ArchitectEntity } from 'src/entities';
import {
  CreateArchitectUseCase,
  GetArchitectsUseCase,
  UpdateArchitectUseCase,
} from 'src/usecases/architect';
import { UpsertArchitectDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import { RoleType } from 'src/entities/user/types';

@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
@Resolver()
export class ArchitectResolver {
  constructor(
    private readonly getArchitectsUseCase: GetArchitectsUseCase,
    private readonly createArchitectUseCase: CreateArchitectUseCase,
    private readonly updateArchitectUseCase: UpdateArchitectUseCase,
  ) {}

  @Query(() => [ArchitectEntity])
  async getArchitects(): Promise<ArchitectEntity[]> {
    return this.getArchitectsUseCase.execute();
  }

  @Mutation(() => ArchitectEntity)
  async createArchitect(
    @Args('input') input: UpsertArchitectDTO,
  ): Promise<ArchitectEntity> {
    return this.createArchitectUseCase.execute(input);
  }

  @Mutation(() => ArchitectEntity)
  async updateArchitect(
    @Args('input') input: UpsertArchitectDTO,
  ): Promise<ArchitectEntity> {
    return this.updateArchitectUseCase.execute(input);
  }
}
