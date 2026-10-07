import { SealDocument } from '../../repositories/seal/schemas/seal.schema';
import { SealHistoryItem } from './types/seal-history-item';
import { SealStatus } from './types/seal-status';

export interface ISealConstructorParams {
  id?: string;
  number: number;
  storeId: string;
  status: SealStatus;
  productId: string;
  saleId?: string | null;
  history: SealHistoryItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class SealEntity {
  public id?: string;
  public number: number;
  public storeId: string;
  public status: SealStatus;
  public productId: string;
  public saleId: string | null;
  public history: SealHistoryItem[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(params: ISealConstructorParams) {
    this.id = params.id;
    this.number = params.number;
    this.storeId = params.storeId;
    this.status = params.status;
    this.productId = params.productId;
    this.saleId = params.saleId ?? null;
    this.history = params.history;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromPersistData(document: SealDocument): SealEntity {
    return new SealEntity({
      id: document._id.toString(),
      number: document.number,
      storeId: document.storeId.toString(),
      status: document.status,
      productId: document.productId.toString(),
      saleId: document.saleId?.toString() ?? null,
      history: document.history.map((item) => ({
        status: item.status,
        userId: item.userId.toString(),
        data: (item.data ?? {}) as Record<string, unknown>,
        createdAt: item.createdAt,
      })),
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }
}
