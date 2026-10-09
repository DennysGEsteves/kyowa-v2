import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { RequestContext } from '../../http/middlewares/request/request-context';
import { BudgetEntity } from '../../entities/budget';
import { PaginatedResult } from '../../shared/types/pagination';
import { CreateBudgetUseCase } from '../../usecases/budget/create-budget.usecase';
import { GetBudgetByIdUseCase } from '../../usecases/budget/get-budget-by-id.usecase';
import { ListBudgetsPaginatedUseCase } from '../../usecases/budget/list-budgets-paginated.usecase';
import { UpdateBudgetUseCase } from '../../usecases/budget/update-budget.usecase';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { ListBudgetsPaginatedQueryDto } from './dto/list-budgets-query.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

type AuthenticatedRequest = {
  user?: RequestContext;
};

@Controller('budgets')
export class BudgetController {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly getBudgetByIdUseCase: GetBudgetByIdUseCase,
    private readonly listBudgetsPaginatedUseCase: ListBudgetsPaginatedUseCase,
    private readonly updateBudgetUseCase: UpdateBudgetUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateBudgetDto): Promise<BudgetEntity> {
    return this.createBudgetUseCase.execute(dto);
  }

  @Get()
  findPaginated(
    @Query() query: ListBudgetsPaginatedQueryDto,
  ): Promise<PaginatedResult<BudgetEntity>> {
    return this.listBudgetsPaginatedUseCase.execute(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<BudgetEntity> {
    return this.getBudgetByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBudgetDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<BudgetEntity> {
    const userId = request.user?.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    return this.updateBudgetUseCase.execute(id, dto, userId);
  }
}
