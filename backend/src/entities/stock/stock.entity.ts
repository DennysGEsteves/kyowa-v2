import { CreateStockDto } from '../../controllers/stock/dto/create-stock.dto';
import { StockDocument } from '../../repositories/stock/schemas/stock.schema';

export interface IStockConstructorParams {
  id?: string;
  productId: string;
  storeId: string;
  userId: string;
  sealIds: string[];
  createdAt: Date;
}

export class StockEntity {
  public id?: string;
  public productId: string;
  public storeId: string;
  public userId: string;
  public sealIds: string[];
  public createdAt: Date;

  constructor(params: IStockConstructorParams) {
    this.id = params.id;
    this.productId = params.productId;
    this.storeId = params.storeId;
    this.userId = params.userId;
    this.sealIds = params.sealIds;
    this.createdAt = params.createdAt;
  }

  static fromCreateStockDto(
    dto: CreateStockDto,
    sealIds: string[],
  ): StockEntity {
    return new StockEntity({
      productId: dto.productId,
      storeId: dto.storeId,
      userId: dto.userId,
      sealIds,
      createdAt: dto.createdAt ?? new Date(),
    });
  }

  static fromPersistData(document: StockDocument): StockEntity {
    return new StockEntity({
      id: document._id.toString(),
      productId: document.productId.toString(),
      storeId: document.storeId.toString(),
      userId: document.userId.toString(),
      sealIds: document.sealIds.map((sealId) => sealId.toString()),
      createdAt: document.createdAt,
    });
  }
}
