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
import { ListPaginatedNameActiveQueryDto } from '../../dto/list-paginated-name-active-query.dto';
import { ArchitectEntity } from '../../entities/architect';
import { CreateArchitectUseCase } from '../../usecases/architect/create-architect.usecase';
import { DeleteArchitectUseCase } from '../../usecases/architect/delete-architect.usecase';
import { GetArchitectByIdUseCase } from '../../usecases/architect/get-architect-by-id.usecase';
import { GetArchitectsUseCase } from '../../usecases/architect/get-architects.usecase';
import { ListArchitectsPaginatedUseCase } from '../../usecases/architect/list-architects-paginated.usecase';
import { UpdateArchitectUseCase } from '../../usecases/architect/update-architect.usecase';
import { PaginatedResult } from '../../types/pagination';
import { CreateArchitectDto } from './dto/create-architect.dto';
import { UpdateArchitectDto } from './dto/update-architect.dto';

@Controller('architects')
export class ArchitectController {
  constructor(
    private readonly createArchitectUseCase: CreateArchitectUseCase,
    private readonly getArchitectsUseCase: GetArchitectsUseCase,
    private readonly listArchitectsPaginatedUseCase: ListArchitectsPaginatedUseCase,
    private readonly getArchitectByIdUseCase: GetArchitectByIdUseCase,
    private readonly updateArchitectUseCase: UpdateArchitectUseCase,
    private readonly deleteArchitectUseCase: DeleteArchitectUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateArchitectDto): Promise<ArchitectEntity> {
    return this.createArchitectUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ArchitectEntity[]> {
    return this.getArchitectsUseCase.execute();
  }

  @Get('paginated')
  findPaginated(
    @Query() query: ListPaginatedNameActiveQueryDto,
  ): Promise<PaginatedResult<ArchitectEntity>> {
    return this.listArchitectsPaginatedUseCase.execute(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ArchitectEntity> {
    return this.getArchitectByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateArchitectDto,
  ): Promise<ArchitectEntity> {
    return this.updateArchitectUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteArchitectUseCase.execute(id);
  }
}
