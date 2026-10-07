import { Inject, Injectable } from '@nestjs/common';
import { ListStockPaginatedQueryDto } from '../../controllers/stock/dto/list-stock-query.dto';
import { StockEntity } from '../../entities/stock';
import {
  IStockRepository,
  STOCK_REPOSITORY,
} from '../../repositories/stock/interfaces/i-stock-repository';
import { PaginatedResult } from '../../shared/types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListStockPaginatedUseCase {
  constructor(
    @Inject(STOCK_REPOSITORY)
    private readonly stockRepository: IStockRepository,
  ) {}

  async execute(
    query: ListStockPaginatedQueryDto,
  ): Promise<PaginatedResult<StockEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;

    return this.stockRepository.findPaginated({ page, limit });
  }
}
