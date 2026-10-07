import { StockEntity } from '../../../entities/stock';
import { PaginatedResult } from '../../../shared/types/pagination';

export const STOCK_REPOSITORY = Symbol('STOCK_REPOSITORY');

export interface StockPaginationParams {
  page: number;
  limit: number;
}

export interface IStockRepository {
  create(data: StockEntity): Promise<StockEntity>;
  findById(id: string): Promise<StockEntity | null>;
  findPaginated(
    pagination: StockPaginationParams,
  ): Promise<PaginatedResult<StockEntity>>;
}
