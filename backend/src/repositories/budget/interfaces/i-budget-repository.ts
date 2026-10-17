import { BudgetEntity } from '../../../entities/budget';
import { BudgetClosingAt } from '../../../entities/budget/types/budget-closing-at';
import { BudgetClosingLevel } from '../../../entities/budget/types/budget-closing-level';
import { BudgetStatus } from '../../../entities/budget/types/budget-status';
import { BudgetHistoryItem } from '../../../entities/budget/types/budget-history-item';
import { PaginatedResult } from '../../../shared/types/pagination';

export const BUDGET_REPOSITORY = Symbol('BUDGET_REPOSITORY');

export interface BudgetListFilters {
  createdAtFrom?: string;
  createdAtTo?: string;
  status?: BudgetStatus;
  userId?: string;
  architectId?: string;
  clientId?: string;
  storeId?: string;
  closingAt?: BudgetClosingAt;
  closingLevel?: BudgetClosingLevel;
}

export interface BudgetPaginationParams {
  page: number;
  limit: number;
}

export interface IBudgetRepository {
  create(data: BudgetEntity): Promise<BudgetEntity>;
  findById(id: string): Promise<BudgetEntity | null>;
  findPaginated(
    filters: BudgetListFilters,
    pagination: BudgetPaginationParams,
  ): Promise<PaginatedResult<BudgetEntity>>;
  update(
    id: string,
    data: BudgetEntity,
    historyEntry?: BudgetHistoryItem,
  ): Promise<BudgetEntity | null>;
}
