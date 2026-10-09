import { BudgetEntity } from '../../../entities/budget';
import { BudgetHistoryItem } from '../../../entities/budget/types/budget-history-item';
import { PaginatedResult } from '../../../shared/types/pagination';

export const BUDGET_REPOSITORY = Symbol('BUDGET_REPOSITORY');

export interface BudgetPaginationParams {
  page: number;
  limit: number;
}

export interface IBudgetRepository {
  create(data: BudgetEntity): Promise<BudgetEntity>;
  findById(id: string): Promise<BudgetEntity | null>;
  findPaginated(
    pagination: BudgetPaginationParams,
  ): Promise<PaginatedResult<BudgetEntity>>;
  update(
    id: string,
    data: BudgetEntity,
    historyEntry?: BudgetHistoryItem,
  ): Promise<BudgetEntity | null>;
}
