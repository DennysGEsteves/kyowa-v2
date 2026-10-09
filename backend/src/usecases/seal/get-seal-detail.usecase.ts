import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SealDetail } from '../../entities/seal';
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
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../repositories/user/interfaces/i-user-repository';
import { buildSealHistoryView } from './build-seal-history-view';

@Injectable()
export class GetSealDetailUseCase {
  constructor(
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: IStoreRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<SealDetail> {
    const seal = await this.sealRepository.findById(id);

    if (!seal?.id) {
      throw new NotFoundException('Lacre não encontrado.');
    }

    const [product, store] = await Promise.all([
      this.productRepository.findById(seal.productId),
      this.storeRepository.findById(seal.storeId),
    ]);

    const storeNames = new Map<string, string>();
    const resolveStoreName = async (storeId: string): Promise<string> => {
      const cached = storeNames.get(storeId);
      if (cached) {
        return cached;
      }
      const store = await this.storeRepository.findById(storeId);
      const name = store?.name ?? '—';
      storeNames.set(storeId, name);
      return name;
    };

    const userNames = new Map<string, string>();
    const resolveUserName = async (userId: string): Promise<string> => {
      const cached = userNames.get(userId);
      if (cached) {
        return cached;
      }
      const user = await this.userRepository.findById(userId);
      const name = user?.name ?? '—';
      userNames.set(userId, name);
      return name;
    };

    const productNames = new Map<string, string>();
    const resolveProductName = async (productId: string): Promise<string> => {
      const cached = productNames.get(productId);
      if (cached) {
        return cached;
      }
      const item = await this.productRepository.findById(productId);
      const name = item?.name ?? '—';
      productNames.set(productId, name);
      return name;
    };

    const history = await buildSealHistoryView(
      seal,
      resolveUserName,
      resolveStoreName,
      resolveProductName,
    );

    return {
      id: seal.id,
      number: seal.number,
      status: seal.status,
      productId: seal.productId,
      productName: product?.name ?? '—',
      productFantasyName: product?.fantasyName ?? null,
      sellPrice: product?.sellPrice ?? null,
      storeId: seal.storeId,
      storeName: store?.name ?? '—',
      history,
      createdAt: seal.createdAt,
      updatedAt: seal.updatedAt,
    };
  }
}
