import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateBudgetDto } from '../../controllers/budget/dto/update-budget.dto';
import { BudgetEntity } from '../../entities/budget';
import type { BudgetHistoryItem } from '../../entities/budget/types/budget-history-item';
import {
  BUDGET_REPOSITORY,
  IBudgetRepository,
} from '../../repositories/budget/interfaces/i-budget-repository';

function buildUpdateHistoryData(
  previous: BudgetEntity,
  next: BudgetEntity,
): Record<string, unknown> {
  const data: Record<string, unknown> = {};

  if (previous.clientId !== next.clientId) {
    data.previousClientId = previous.clientId;
    data.clientId = next.clientId;
  }
  if (previous.storeId !== next.storeId) {
    data.previousStoreId = previous.storeId;
    data.storeId = next.storeId;
  }
  if (previous.architectId !== next.architectId) {
    data.previousArchitectId = previous.architectId;
    data.architectId = next.architectId;
  }
  if (previous.obs !== next.obs) {
    data.previousObs = previous.obs;
    data.obs = next.obs;
  }
  if (previous.lostReasons !== next.lostReasons) {
    data.previousLostReasons = previous.lostReasons;
    data.lostReasons = next.lostReasons;
  }
  if (previous.total !== next.total) {
    data.previousTotal = previous.total;
    data.total = next.total;
  }
  if (previous.status !== next.status) {
    data.previousStatus = previous.status;
    data.status = next.status;
  }
  if (previous.closingAt !== next.closingAt) {
    data.previousClosingAt = previous.closingAt;
    data.closingAt = next.closingAt;
  }
  if (previous.closingLevel !== next.closingLevel) {
    data.previousClosingLevel = previous.closingLevel;
    data.closingLevel = next.closingLevel;
  }
  if (JSON.stringify(previous.checkout) !== JSON.stringify(next.checkout)) {
    data.previousCheckout = previous.checkout;
    data.checkout = next.checkout;
  }

  return data;
}

@Injectable()
export class UpdateBudgetUseCase {
  constructor(
    @Inject(BUDGET_REPOSITORY)
    private readonly budgetRepository: IBudgetRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateBudgetDto,
    userId: string,
  ): Promise<BudgetEntity> {
    const budget = await this.budgetRepository.findById(id);

    if (!budget?.id) {
      throw new NotFoundException('Orçamento não encontrado.');
    }

    const updatedEntity = BudgetEntity.fromUpdateBudgetDto(budget, dto);
    const historyData = buildUpdateHistoryData(budget, updatedEntity);

    if (Object.keys(historyData).length === 0) {
      return budget;
    }

    const historyEntry: BudgetHistoryItem = {
      userId,
      createdAt: new Date(),
      data: historyData,
    };

    const updated = await this.budgetRepository.update(
      id,
      updatedEntity,
      historyEntry,
    );

    if (!updated) {
      throw new BadRequestException('Não foi possível atualizar o orçamento.');
    }

    return updated;
  }
}
