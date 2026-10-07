import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StockEntity } from '../../entities/stock';
import { PaginatedResult } from '../../shared/types/pagination';
import { IStockRepository } from './interfaces/i-stock-repository';
import { Stock, StockDocument } from './schemas/stock.schema';

@Injectable()
export class StockRepository implements IStockRepository {
  constructor(
    @InjectModel(Stock.name)
    private readonly stockModel: Model<StockDocument>,
  ) {}

  async create(data: StockEntity): Promise<StockEntity> {
    const created = await this.stockModel.create({
      productId: new Types.ObjectId(data.productId),
      storeId: new Types.ObjectId(data.storeId),
      userId: new Types.ObjectId(data.userId),
      sealIds: data.sealIds.map((sealId) => new Types.ObjectId(sealId)),
      createdAt: data.createdAt,
    });

    return StockEntity.fromPersistData(created);
  }

  async findById(id: string): Promise<StockEntity | null> {
    const stock = await this.stockModel.findById(id).exec();
    return stock ? StockEntity.fromPersistData(stock) : null;
  }

  async findPaginated(pagination: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<StockEntity>> {
    const skip = (pagination.page - 1) * pagination.limit;

    const [total, stocks] = await Promise.all([
      this.stockModel.countDocuments().exec(),
      this.stockModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: stocks.map((stock) => StockEntity.fromPersistData(stock)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }
}
