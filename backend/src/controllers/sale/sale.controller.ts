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
import { SaleEntity } from '../../entities/sale';
import { PaginatedResult } from '../../shared/types/pagination';
import { CreateSaleUseCase } from '../../usecases/sale/create-sale.usecase';
import { GetSaleByIdUseCase } from '../../usecases/sale/get-sale-by-id.usecase';
import { ListSalesPaginatedUseCase } from '../../usecases/sale/list-sales-paginated.usecase';
import { UpdateSaleUseCase } from '../../usecases/sale/update-sale.usecase';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ListSalesPaginatedQueryDto } from './dto/list-sales-query.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

type AuthenticatedRequest = {
  user?: RequestContext;
};

@Controller('sales')
export class SaleController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly getSaleByIdUseCase: GetSaleByIdUseCase,
    private readonly listSalesPaginatedUseCase: ListSalesPaginatedUseCase,
    private readonly updateSaleUseCase: UpdateSaleUseCase,
  ) {}

  @Post()
  create(
    @Body() dto: CreateSaleDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<SaleEntity> {
    const userId = request.user?.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    return this.createSaleUseCase.execute(dto, userId);
  }

  @Get()
  findPaginated(
    @Query() query: ListSalesPaginatedQueryDto,
  ): Promise<PaginatedResult<SaleEntity>> {
    return this.listSalesPaginatedUseCase.execute(query);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<SaleEntity> {
    return this.getSaleByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSaleDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<SaleEntity> {
    const userId = request.user?.user.id;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado.');
    }

    return this.updateSaleUseCase.execute(id, dto, userId);
  }
}