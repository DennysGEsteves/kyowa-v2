import { Inject, Injectable } from '@nestjs/common';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import {
  IProviderRepository,
  PROVIDER_REPOSITORY,
} from '../../repositories/provider/interfaces/i-provider-repository';
import { UpdateProductsPriceUseCaseDto } from '../../controllers/product/dto/update-product-price.dto';

@Injectable()
export class UpdateProductsPriceUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(PROVIDER_REPOSITORY)
    private readonly providerRepository: IProviderRepository,
  ) {}

  async execute(dto: UpdateProductsPriceUseCaseDto): Promise<number> {
    const name = dto.name?.trim();
    const providerName = dto.providerName?.trim();
    const categoryId = dto.categoryId?.trim();

    let providerIds: string[] | undefined;
    if (providerName) {
      providerIds =
        await this.providerRepository.findIdsByNameFilter(providerName);
      if (providerIds.length === 0) {
        return 0;
      }
    }

    const updatedCount = await this.productRepository.updateProducsSellPrice(
      {
        name: name || undefined,
        providerIds,
        categoryId: categoryId || undefined,
      },
      dto.value,
    );

    return updatedCount;
  }
}
