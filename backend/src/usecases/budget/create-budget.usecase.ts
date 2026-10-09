import { Inject, Injectable } from '@nestjs/common';
import { CreateBudgetDto } from '../../controllers/budget/dto/create-budget.dto';
import { BudgetEntity } from '../../entities/budget';
import {
  BUDGET_REPOSITORY,
  IBudgetRepository,
} from '../../repositories/budget/interfaces/i-budget-repository';

@Injectable()
export class CreateBudgetUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async execute(dto: CreateBudgetDto): Promise<BudgetEntity> {
    const budget = BudgetEntity.fromCreateBudgetDto(dto);
    return this.budgetRepository.create(budget);
  }
}
