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

    const history = await Promise.all(
      seal.history.map(async (entry) => {
        const user = await this.userRepository.findById(entry.userId);
        const data = { ...entry.data };

        const previousStoreId = data.previousStoreId;
        const storeId = data.storeId;
        if (
          typeof previousStoreId === 'string' &&
          typeof storeId === 'string' &&
          previousStoreId !== storeId
        ) {
          data.storeName = await resolveStoreName(storeId);
        }

        return {
          status: entry.status,
          userId: entry.userId,
          userName: user?.name ?? '—',
          data,
          createdAt: entry.createdAt,
        };
      }),
    );

    history.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

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
