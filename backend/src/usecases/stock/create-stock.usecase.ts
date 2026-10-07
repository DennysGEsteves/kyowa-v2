import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateStockDto } from '../../controllers/stock/dto/create-stock.dto';
import { SealEntity } from '../../entities/seal';
import { SealStatus } from '../../entities/seal/types/seal-status';
import { StockEntity } from '../../entities/stock';
import {
  ISealRepository,
  SEAL_REPOSITORY,
} from '../../repositories/seal/interfaces/i-seal-repository';
import {
  IStockRepository,
  STOCK_REPOSITORY,
} from '../../repositories/stock/interfaces/i-stock-repository';

@Injectable()
export class CreateStockUseCase {
  constructor(
    @Inject(STOCK_REPOSITORY)
    private readonly stockRepository: IStockRepository,
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
  ) {}

  async execute(dto: CreateStockDto): Promise<StockEntity> {
    const uniqueNumbers = new Set(dto.sealNumbers);
    if (uniqueNumbers.size !== dto.sealNumbers.length) {
      throw new BadRequestException(
        'Números de lacra duplicados na requisição.',
      );
    }

    const createdAt = dto.createdAt ?? new Date();
    const sealIds: string[] = [];

    for (const number of dto.sealNumbers) {
      const seal = await this.sealRepository.create(
        new SealEntity({
          number,
          storeId: dto.storeId,
          status: SealStatus.Stock,
          productId: dto.productId,
          history: [
            {
              status: SealStatus.Stock,
              userId: dto.userId,
              data: {},
              createdAt,
            },
          ],
        }),
      );

      if (!seal.id) {
        throw new BadRequestException('Falha ao criar lacra.');
      }

      sealIds.push(seal.id);
    }

    const stock = StockEntity.fromCreateStockDto(dto, sealIds);
    return this.stockRepository.create(stock);
  }
}
