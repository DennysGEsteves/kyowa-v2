import { Inject, Injectable } from '@nestjs/common';
import { ListSalesPaginatedQueryDto } from '../../controllers/sale/dto/list-sales-query.dto';
import { SaleEntity } from '../../entities/sale';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';
import { PaginatedResult } from '../../shared/types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListSalesPaginatedUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(
    query: ListSalesPaginatedQueryDto,
  ): Promise<PaginatedResult<SaleEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;

    return this.saleRepository.findPaginated(
      {
        createdAtFrom: query.createdAtFrom,
        createdAtTo: query.createdAtTo,
        isPaid: query.isPaid,
        type: query.type,
        clientId: query.clientId,
        sellerId: query.sellerId,
        storeId: query.storeId,
        architectId: query.architectId,
      },
      { page, limit },
    );
  }
}
