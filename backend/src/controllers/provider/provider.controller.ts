import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProviderEntity } from '../../entities/provider';
import { CreateProviderUseCase } from '../../usecases/provider/create-provider.usecase';
import { DeleteProviderUseCase } from '../../usecases/provider/delete-provider.usecase';
import { GetProviderByIdUseCase } from '../../usecases/provider/get-provider-by-id.usecase';
import { GetProvidersUseCase } from '../../usecases/provider/get-providers.usecase';
import { ListProvidersPaginatedUseCase } from '../../usecases/provider/list-providers-paginated.usecase';
import { UpdateProviderUseCase } from '../../usecases/provider/update-provider.usecase';
import { PaginatedResult } from '../../shared/types/pagination';
import { CreateProviderDto } from './dto/create-provider.dto';
import { ListProvidersPaginatedQueryDto } from './dto/list-providers-query.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller('providers')
export class ProviderController {
  constructor(
    private readonly createProviderUseCase: CreateProviderUseCase,
    private readonly getProvidersUseCase: GetProvidersUseCase,
    private readonly listProvidersPaginatedUseCase: ListProvidersPaginatedUseCase,
    private readonly getProviderByIdUseCase: GetProviderByIdUseCase,
    private readonly updateProviderUseCase: UpdateProviderUseCase,
    private readonly deleteProviderUseCase: DeleteProviderUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProviderDto): Promise<ProviderEntity> {
    return this.createProviderUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProviderEntity[]> {
    return this.getProvidersUseCase.execute();
  }

  @Get('paginated')
  findPaginated(
    @Query() query: ListProvidersPaginatedQueryDto,
  ): Promise<PaginatedResult<ProviderEntity>> {
    return this.listProvidersPaginatedUseCase.execute(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProviderEntity> {
    return this.getProviderByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProviderDto,
  ): Promise<ProviderEntity> {
    return this.updateProviderUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProviderUseCase.execute(id);
  }
}
