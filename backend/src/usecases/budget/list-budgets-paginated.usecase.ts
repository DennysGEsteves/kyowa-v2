import { Inject, Injectable } from '@nestjs/common';
import { ListBudgetsPaginatedQueryDto } from '../../controllers/budget/dto/list-budgets-query.dto';
import { BudgetEntity } from '../../entities/budget';
import {
  BUDGET_REPOSITORY,
  IBudgetRepository,
} from '../../repositories/budget/interfaces/i-budget-repository';
import { PaginatedResult } from '../../shared/types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListBudgetsPaginatedUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async execute(
    query: ListBudgetsPaginatedQueryDto,
  ): Promise<PaginatedResult<BudgetEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;

    return this.budgetRepository.findPaginated({ page, limit });
  }
}
