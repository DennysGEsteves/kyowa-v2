import { Inject, Injectable } from '@nestjs/common';
import { ListUpdatePricesProductsQueryDto } from '../../controllers/product/dto/list-update-prices-products-query.dto';
import { ProductEntity } from '../../entities/product';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';
import { PaginatedResult } from '../../shared/types/pagination';
import {
  IProductCategoryRepository,
  PRODUCT_CATEGORY_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-category-repository';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

@Injectable()
export class ListUpdatePricesProductsUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
    @Inject(PRODUCT_CATEGORY_REPOSITORY)
    private readonly productCategoryRepository: IProductCategoryRepository,
  ) {}

  async execute(
    query: ListUpdatePricesProductsQueryDto,
  ): Promise<PaginatedResult<ProductEntity>> {
    const page = query.page ?? DEFAULT_PAGE;
    const limit = query.limit ?? DEFAULT_LIMIT;
    const name = query.name?.trim();
    const providerName = query.providerName?.trim();
    const categoryId = query.categoryId?.trim();

    let providerIds: string[] | undefined;
    if (providerName) {
      providerIds =
        await this.providerRepository.findIdsByNameFilter(providerName);
      if (providerIds.length === 0) {
        return {
          data: [],
          meta: { page, limit, total: 0, totalPages: 0 },
        };
      }
    }

    const products = await this.productRepository.findPaginatedForPriceUpdate(
      {
        name: name || undefined,
        providerIds,
        categoryId: categoryId || undefined,
      },
      { page, limit },
    );

    const productsWithCategoryAndProvider = await Promise.all(
      products.data.map(async (product) => {
        const category = await this.productCategoryRepository.findById(
          product.categoryId!,
        );
        const provider = await this.providerRepository.findById(
          product.providerId!,
        );
        return {
          ...product,
          category,
          provider,
        };
      }),
    );

    return {
      data: productsWithCategoryAndProvider as ProductEntity[],
      meta: products.meta,
    };
  }
}
