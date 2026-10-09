import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetEntity } from '../../entities/budget';
import {
  BUDGET_REPOSITORY,
  IBudgetRepository,
} from '../../repositories/budget/interfaces/i-budget-repository';

@Injectable()
export class GetBudgetByIdUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async execute(id: string): Promise<BudgetEntity> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget?.id) {
      throw new NotFoundException('Orçamento não encontrado.');
    }

    return budget;
  }
}
