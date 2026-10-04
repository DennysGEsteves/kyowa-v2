import { Inject, Injectable } from '@nestjs/common';
import { SearchProductsByNameQueryDto } from '../../controllers/product/dto/search-products-by-name-query.dto';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import { ProductEntity } from '../../entities/product';

const DEFAULT_LIMIT = 10;

@Injectable()
export class SearchProductsByNameUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(query: SearchProductsByNameQueryDto): Promise<ProductEntity[]> {
    const name = query.name.trim();
    const limit = query.limit ?? DEFAULT_LIMIT;
    return this.productRepository.searchByName(name, limit);
  }
}
