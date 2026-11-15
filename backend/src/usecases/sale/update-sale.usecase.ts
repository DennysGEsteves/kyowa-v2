import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSaleDto } from '../../controllers/sale/dto/update-sale.dto';
import { SaleEntity } from '../../entities/sale';
import type { SaleHistoryItem } from '../../entities/sale/types/sale-history-item';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';
import { SaleType } from '../../entities/sale/types/sale-type';
import { buildSaleUpdateHistoryData } from './build-sale-update-history';
import { SyncSaleCheckoutSealsUseCase } from './sync-sale-checkout-seals';

@Injectable()
export class UpdateSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
    private readonly syncSaleCheckoutSeals: SyncSaleCheckoutSealsUseCase,
  ) {}

  async execute(
    id: string,
    dto: UpdateSaleDto,
    userId: string,
  ): Promise<SaleEntity> {
    const sale = await this.saleRepository.findById(id);

    if (!sale?.id) {
      throw new NotFoundException('Venda não encontrada.');
    }

    const updatedEntity = SaleEntity.fromUpdateSaleDto(sale, dto);
    const historyData = buildSaleUpdateHistoryData(sale, updatedEntity);

    if (Object.keys(historyData).length === 0) {
      return sale;
    }

    const historyEntry: SaleHistoryItem = {
      userId,
      createdAt: new Date(),
      data: historyData,
    };

    const updated = await this.saleRepository.update(
      id,
      updatedEntity,
      historyEntry,
    );

    if (!updated) {
      throw new BadRequestException('Não foi possível atualizar a venda.');
    }

    const checkoutChanged =
      JSON.stringify(sale.checkout) !== JSON.stringify(updatedEntity.checkout);
    const consignmentClosedAsSale =
      sale.type === SaleType.Consignment &&
      updatedEntity.type === SaleType.Sale;

    if (checkoutChanged || consignmentClosedAsSale) {
      await this.syncSaleCheckoutSeals.execute({
        saleId: id,
        storeId: updatedEntity.storeId,
        saleType: updatedEntity.type,
        previousSaleType: sale.type,
        previousCheckout: sale.checkout,
        nextCheckout: updatedEntity.checkout,
        userId,
      });
    }

    return updated;
  }
}