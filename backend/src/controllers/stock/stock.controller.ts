import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { ListStockPaginatedQueryDto } from './dto/list-stock-query.dto';
import { StockDetail, StockEntity } from '../../entities/stock';
import { PaginatedResult } from '../../shared/types/pagination';
import { CreateStockUseCase } from '../../usecases/stock/create-stock.usecase';
import { GetStockDetailUseCase } from '../../usecases/stock/get-stock-detail.usecase';
import { ListStockPaginatedUseCase } from '../../usecases/stock/list-stock-paginated.usecase';

@Controller('stock')
export class StockController {
  constructor(
    private readonly createStockUseCase: CreateStockUseCase,
    private readonly getStockDetailUseCase: GetStockDetailUseCase,
    private readonly listStockPaginatedUseCase: ListStockPaginatedUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateStockDto): Promise<StockEntity> {
    return this.createStockUseCase.execute(dto);
  }

  @Get()
  findPaginated(
    @Query() query: ListStockPaginatedQueryDto,
  ): Promise<PaginatedResult<StockEntity>> {
    return this.listStockPaginatedUseCase.execute(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<StockDetail> {
    return this.getStockDetailUseCase.execute(id);
  }
}
