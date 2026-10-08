import { Inject, Injectable } from '@nestjs/common';
import { SealSearchItem } from '../../entities/seal';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';
import {
  ISealRepository,
  SEAL_REPOSITORY,
} from '../../repositories/seal/interfaces/i-seal-repository';
import {
  IStoreRepository,
  STORE_REPOSITORY,
} from '../../repositories/store/interfaces/i-store-repository';

@Injectable()
export class SearchSealsByNumberUseCase {
  constructor(
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(number: number): Promise<SealSearchItem[]> {
    const seals = await this.sealRepository.findByNumber(number);

    const results: SealSearchItem[] = [];

    for (const seal of seals) {
      if (!seal.id) {
        continue;
      }

      const [product, store] = await Promise.all([
        this.productRepository.findById(seal.productId),
        this.storeRepository.findById(seal.storeId),
      ]);

      results.push({
        id: seal.id,
        number: seal.number,
        status: seal.status,
        productId: seal.productId,
        productName: product?.name ?? '—',
        sellPrice: product?.sellPrice ?? null,
        storeId: seal.storeId,
        storeName: store?.name ?? '—',
      });
    }

    return results;
  }
}
