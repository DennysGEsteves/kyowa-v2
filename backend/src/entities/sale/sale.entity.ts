import { CreateSaleDto } from '../../controllers/sale/dto/create-sale.dto';
import { UpdateSaleDto } from '../../controllers/sale/dto/update-sale.dto';
import { SaleDocument } from '../../repositories/sale/schemas/sale.schema';
import type { SaleCheckoutItem } from './types/sale-checkout-item';
import { SalePaymentMethod } from './types/sale-payment-method';
import { SaleType } from './types/sale-type';

function mapCheckoutFromDto(
  items: CreateSaleDto['checkout'] | UpdateSaleDto['checkout'],
): SaleCheckoutItem[] {
  return (items ?? []).map((item) => ({
    hasSeal: item.hasSeal,
    sealId: item.sealId ?? null,
    value: item.value ?? null,
    productId: item.productId ?? null,
    quantity: item.quantity ?? null,
    description: item.description ?? null,
    orderId: item.orderId ?? null,
  }));
}

export interface ISaleConstructorParams {
  id?: string;
  sequentialId?: number | null;
  clientId: string;
  sellerId: string;
  storeId: string;
  architectId?: string | null;
  architectParticipation: boolean;
  createdAt: Date;
  obsReceipt?: string | null;
  obsInternal?: string | null;
  type: SaleType;
  changeCredit?: number | null;
  plots?: number | null;
  paymentMethod?: SalePaymentMethod | null;
  paidAt?: Date | null;
  checkout: SaleCheckoutItem[];
}

export class SaleEntity {
  public id?: string;
  public sequentialId: number | null;
  public clientId: string;
  public sellerId: string;
  public storeId: string;
  public architectId: string | null;
  public architectParticipation: boolean;
  public createdAt: Date;
  public obsReceipt: string | null;
  public obsInternal: string | null;
  public type: SaleType;
  public changeCredit: number | null;
  public plots: number | null;
  public paymentMethod: SalePaymentMethod | null;
  public paidAt: Date | null;
  public checkout: SaleCheckoutItem[];

  static fromCreateSaleDto(dto: CreateSaleDto): SaleEntity {
    const checkout = mapCheckoutFromDto(dto.checkout);
    const createdAt = dto.createdAt ?? new Date();

    return new SaleEntity({
      clientId: dto.clientId,
      sellerId: dto.sellerId,
      storeId: dto.storeId,
      architectId: dto.architectId ?? null,
      architectParticipation: dto.architectParticipation ?? false,
      createdAt,
      obsReceipt: dto.obsReceipt ?? null,
      obsInternal: dto.obsInternal ?? null,
      type: dto.type,
      changeCredit: dto.changeCredit ?? null,
      plots: dto.plots ?? null,
      paymentMethod: dto.paymentMethod ?? null,
      paidAt: dto.paidAt ?? null,
      checkout,
    });
  }

  static fromUpdateSaleDto(
    current: SaleEntity,
    dto: UpdateSaleDto,
  ): SaleEntity {
    const checkout =
      dto.checkout !== undefined
        ? mapCheckoutFromDto(dto.checkout)
        : current.checkout;

    return new SaleEntity({
      id: current.id,
      sequentialId: current.sequentialId,
      clientId: dto.clientId ?? current.clientId,
      sellerId: dto.sellerId ?? current.sellerId,
      storeId: dto.storeId ?? current.storeId,
      architectId:
        dto.architectId !== undefined ? dto.architectId : current.architectId,
      architectParticipation:
        dto.architectParticipation ?? current.architectParticipation,
      createdAt: current.createdAt,
      obsReceipt:
        dto.obsReceipt !== undefined ? dto.obsReceipt : current.obsReceipt,
      obsInternal:
        dto.obsInternal !== undefined ? dto.obsInternal : current.obsInternal,
      type: dto.type ?? current.type,
      changeCredit:
        dto.changeCredit !== undefined
          ? dto.changeCredit
          : current.changeCredit,
      plots: dto.plots !== undefined ? dto.plots : current.plots,
      paymentMethod:
        dto.paymentMethod !== undefined
          ? dto.paymentMethod
          : current.paymentMethod,
      paidAt: dto.paidAt !== undefined ? dto.paidAt : current.paidAt,
      checkout,
    });
  }

  constructor(params: ISaleConstructorParams) {
    this.id = params.id;
    this.sequentialId = params.sequentialId ?? null;
    this.clientId = params.clientId;
    this.sellerId = params.sellerId;
    this.storeId = params.storeId;
    this.architectId = params.architectId ?? null;
    this.architectParticipation = params.architectParticipation;
    this.createdAt = params.createdAt;
    this.obsReceipt = params.obsReceipt ?? null;
    this.obsInternal = params.obsInternal ?? null;
    this.type = params.type;
    this.changeCredit = params.changeCredit ?? null;
    this.plots = params.plots ?? null;
    this.paymentMethod = params.paymentMethod ?? null;
    this.paidAt = params.paidAt ?? null;
    this.checkout = params.checkout;
  }

  static fromPersistData(document: SaleDocument): SaleEntity {
    return new SaleEntity({
      id: document._id.toString(),
      sequentialId: document.sequentialId ?? null,
      clientId: document.clientId.toString(),
      sellerId: document.sellerId.toString(),
      storeId: document.storeId.toString(),
      architectId: document.architectId?.toString() ?? null,
      architectParticipation: document.architectParticipation,
      createdAt: document.createdAt,
      obsReceipt: document.obsReceipt ?? null,
      obsInternal: document.obsInternal ?? null,
      type: document.type,
      changeCredit: document.changeCredit ?? null,
      plots: document.plots ?? null,
      paymentMethod: document.paymentMethod ?? null,
      paidAt: document.paidAt ?? null,
      checkout: document.checkout.map((item) => ({
        hasSeal: item.hasSeal,
        sealId: item.sealId ?? null,
        value: item.value ?? null,
        productId: item.productId?.toString() ?? null,
        quantity: item.quantity ?? null,
        description: item.description ?? null,
        orderId: item.orderId?.toString() ?? null,
      })),
    });
  }
}
