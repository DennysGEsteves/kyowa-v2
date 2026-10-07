import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { StockDetail } from '../../entities/stock';
import {
  ISealRepository,
  SEAL_REPOSITORY,
} from '../../repositories/seal/interfaces/i-seal-repository';
import {
  IStockRepository,
  STOCK_REPOSITORY,
} from '../../repositories/stock/interfaces/i-stock-repository';

@Injectable()
export class GetStockDetailUseCase {
  constructor(
    @Inject(STOCK_REPOSITORY)
    private readonly stockRepository: IStockRepository,
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
  ) {}

  async execute(id: string): Promise<StockDetail> {
    const stock = await this.stockRepository.findById(id);

    if (!stock?.id) {
      throw new NotFoundException('Lançamento de estoque não encontrado.');
    }

    const seals = await this.sealRepository.findByIds(stock.sealIds);

    return {
      id: stock.id,
      productId: stock.productId,
      storeId: stock.storeId,
      userId: stock.userId,
      sealIds: stock.sealIds,
      createdAt: stock.createdAt,
      seals: seals.map((seal) => ({
        id: seal.id!,
        number: seal.number,
        status: seal.status,
      })),
    };
  }
}
