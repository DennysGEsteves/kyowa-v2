import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { SealEntity } from '../../entities/seal';
import { SealStatus } from '../../entities/seal/types/seal-status';
import type { SaleCheckoutItem } from '../../entities/sale/types/sale-checkout-item';
import { SaleType } from '../../entities/sale/types/sale-type';
import {
  SEAL_HISTORY_EVENT_ASSIGNED_TO_SALE_CHECKOUT,
  SEAL_HISTORY_EVENT_CONSIGNMENT_CONVERTED_TO_SALE,
  SEAL_HISTORY_EVENT_RETURNED_TO_STOCK,
} from '../../entities/seal/types/seal-history-item';
import {
  ISealRepository,
  SEAL_REPOSITORY,
} from '../../repositories/seal/interfaces/i-seal-repository';

function checkoutSealNumbers(checkout: SaleCheckoutItem[]): number[] {
  const numbers: number[] = [];
  for (const item of checkout) {
    if (item.hasSeal && item.sealId != null) {
      numbers.push(item.sealId);
    }
  }
  return numbers;
}

function multisetDiff(
  before: number[],
  after: number[],
): { removed: number[]; added: number[] } {
  const count = (values: number[]) => {
    const map = new Map<number, number>();
    for (const value of values) {
      map.set(value, (map.get(value) ?? 0) + 1);
    }
    return map;
  };

  const beforeMap = count(before);
  const afterMap = count(after);
  const removed: number[] = [];
  const added: number[] = [];

  for (const [number, qty] of beforeMap) {
    const nextQty = afterMap.get(number) ?? 0;
    for (let index = 0; index < qty - nextQty; index += 1) {
      removed.push(number);
    }
  }

  for (const [number, qty] of afterMap) {
    const prevQty = beforeMap.get(number) ?? 0;
    for (let index = 0; index < qty - prevQty; index += 1) {
      added.push(number);
    }
  }

  return { removed, added };
}

type SyncSaleCheckoutSealsParams = {
  saleId: string;
  storeId: string;
  saleType: SaleType;
  previousSaleType?: SaleType;
  previousCheckout: SaleCheckoutItem[];
  nextCheckout: SaleCheckoutItem[];
  userId: string;
};

@Injectable()
export class SyncSaleCheckoutSealsUseCase {
  constructor(
    @Inject(SEAL_REPOSITORY)
    private readonly sealRepository: ISealRepository,
  ) {}

  async execute(params: SyncSaleCheckoutSealsParams): Promise<void> {
    const {
      saleId,
      storeId,
      saleType,
      previousSaleType,
      previousCheckout,
      nextCheckout,
      userId,
    } = params;

    const { removed, added } = multisetDiff(
      checkoutSealNumbers(previousCheckout),
      checkoutSealNumbers(nextCheckout),
    );

    for (const number of removed) {
      await this.releaseSeal(number, storeId, saleId, saleType, userId);
    }

    for (const number of added) {
      await this.reserveSeal(number, storeId, saleId, saleType, userId);
    }

    if (
      previousSaleType === SaleType.Consignment &&
      saleType === SaleType.Sale
    ) {
      const addedSet = new Set(added);
      for (const number of checkoutSealNumbers(nextCheckout)) {
        if (addedSet.has(number)) {
          continue;
        }
        await this.recordConsignmentConvertedToSale(
          number,
          storeId,
          saleId,
          userId,
        );
      }
    }
  }

  private async recordConsignmentConvertedToSale(
    number: number,
    storeId: string,
    saleId: string,
    userId: string,
  ): Promise<void> {
    const seal = await this.findSealOrThrow(storeId, number);

    if (seal.saleId !== saleId) {
      return;
    }

    await this.assignSeal(seal, saleId, SealStatus.Sale, userId, {
      event: SEAL_HISTORY_EVENT_CONSIGNMENT_CONVERTED_TO_SALE,
      saleId,
      saleType: SaleType.Sale,
      previousSaleType: SaleType.Consignment,
    });
  }

  private async findSealOrThrow(
    storeId: string,
    number: number,
  ): Promise<SealEntity> {
    const seal = await this.sealRepository.findByStoreIdAndNumber(
      storeId,
      number,
    );

    if (!seal?.id) {
      throw new BadRequestException(
        `Lacre nº ${number} não encontrado nesta loja.`,
      );
    }

    return seal;
  }

  private async releaseSeal(
    number: number,
    storeId: string,
    saleId: string,
    saleType: SaleType,
    userId: string,
  ): Promise<void> {
    const seal = await this.findSealOrThrow(storeId, number);

    if (seal.status === SealStatus.Stock && !seal.saleId) {
      return;
    }

    if (seal.saleId && seal.saleId !== saleId) {
      throw new BadRequestException(
        `Lacre nº ${number} não pertence a este registro.`,
      );
    }

    await this.assignSeal(seal, null, SealStatus.Stock, userId, {
      event: SEAL_HISTORY_EVENT_RETURNED_TO_STOCK,
      saleId,
      saleType,
    });
  }

  private async reserveSeal(
    number: number,
    storeId: string,
    saleId: string,
    saleType: SaleType,
    userId: string,
  ): Promise<void> {
    const seal = await this.findSealOrThrow(storeId, number);

    if (seal.status !== SealStatus.Stock) {
      throw new BadRequestException(
        `Lacre nº ${number} não está em estoque.`,
      );
    }

    if (seal.saleId) {
      throw new BadRequestException(
        `Lacre nº ${number} não está em estoque.`,
      );
    }

    await this.assignSeal(seal, saleId, SealStatus.Sale, userId, {
      event: SEAL_HISTORY_EVENT_ASSIGNED_TO_SALE_CHECKOUT,
      saleId,
      saleType,
      status: SealStatus.Sale,
    });
  }

  private async assignSeal(
    seal: SealEntity,
    saleId: string | null,
    status: SealStatus,
    userId: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    if (!seal.id) {
      return;
    }

    const updated = await this.sealRepository.updateCheckoutAssignment(
      seal.id,
      { status, saleId },
      {
        status,
        userId,
        data: {
          ...data,
          previousStatus: seal.status,
          previousSaleId: seal.saleId,
        },
        createdAt: new Date(),
      },
    );

    if (!updated) {
      throw new BadRequestException(
        `Não foi possível atualizar o lacre nº ${seal.number}.`,
      );
    }
  }
}