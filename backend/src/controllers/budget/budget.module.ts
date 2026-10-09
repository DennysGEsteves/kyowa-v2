import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BUDGET_REPOSITORY } from '../../repositories/budget/interfaces/i-budget-repository';
import { BudgetRepository } from '../../repositories/budget/budget.repository';
import {
  Budget,
  BudgetSchema,
} from '../../repositories/budget/schemas/budget.schema';
import { CreateBudgetUseCase } from '../../usecases/budget/create-budget.usecase';
import { GetBudgetByIdUseCase } from '../../usecases/budget/get-budget-by-id.usecase';
import { ListBudgetsPaginatedUseCase } from '../../usecases/budget/list-budgets-paginated.usecase';
import { UpdateBudgetUseCase } from '../../usecases/budget/update-budget.usecase';
import { BudgetController } from './budget.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  controllers: [BudgetController],
  providers: [
    {
      provide: BUDGET_REPOSITORY,
      useClass: BudgetRepository,
    },
    CreateBudgetUseCase,
    GetBudgetByIdUseCase,
    ListBudgetsPaginatedUseCase,
    UpdateBudgetUseCase,
  ],
  exports: [BUDGET_REPOSITORY],
})
export class BudgetModule {}
