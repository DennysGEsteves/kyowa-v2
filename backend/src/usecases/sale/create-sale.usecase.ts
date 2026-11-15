import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../../controllers/sale/dto/create-sale.dto';
import { SaleEntity } from '../../entities/sale';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';
import { SyncSaleCheckoutSealsUseCase } from './sync-sale-checkout-seals';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
    private readonly syncSaleCheckoutSeals: SyncSaleCheckoutSealsUseCase,
  ) {}

  async execute(dto: CreateSaleDto, actorUserId: string): Promise<SaleEntity> {
    const sale = SaleEntity.fromCreateSaleDto(dto, actorUserId);
    const created = await this.saleRepository.create(sale);

    if (!created.id) {
      throw new BadRequestException('Não foi possível criar a venda.');
    }

    await this.syncSaleCheckoutSeals.execute({
      saleId: created.id,
      storeId: created.storeId,
      saleType: created.type,
      previousCheckout: [],
      nextCheckout: created.checkout,
      userId: actorUserId,
    });

    return created;
  }
}