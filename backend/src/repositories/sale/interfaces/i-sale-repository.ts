import { SaleEntity } from '../../../entities/sale';
import type { SaleHistoryItem } from '../../../entities/sale/types/sale-history-item';
import { SaleType } from '../../../entities/sale/types/sale-type';
import { PaginatedResult } from '../../../shared/types/pagination';

export const SALE_REPOSITORY = Symbol('SALE_REPOSITORY');

export interface SaleListFilters {
  createdAtFrom?: string;
  createdAtTo?: string;
  isPaid?: boolean;
  type?: SaleType;
  clientId?: string;
  sellerId?: string;
  storeId?: string;
  architectId?: string;
}

export interface SalePaginationParams {
  page: number;
  limit: number;
}

export interface ISaleRepository {
  create(data: SaleEntity): Promise<SaleEntity>;
  findById(id: string): Promise<SaleEntity | null>;
  findPaginated(
    filters: SaleListFilters,
    pagination: SalePaginationParams,
  ): Promise<PaginatedResult<SaleEntity>>;
  update(
    id: string,
    data: SaleEntity,
    historyEntry?: SaleHistoryItem,
  ): Promise<SaleEntity | null>;
}
