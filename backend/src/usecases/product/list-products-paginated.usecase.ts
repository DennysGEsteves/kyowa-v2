import { Inject, Injectable } from '@nestjs/common';
import { ListPaginatedNameQueryDto } from '../../dto/list-paginated-name-query.dto';
import { ProductEntity } from '../../entities/product';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import { PaginatedResult } from '../../types/pagination';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListProductsPaginatedUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(
    query: ListPaginatedNameQueryDto,
  ): Promise<PaginatedResult<ProductEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const name = query.name?.trim();

    return this.productRepository.findPaginated(
      { name: name || undefined },
      { page, limit },
    );
  }
}
