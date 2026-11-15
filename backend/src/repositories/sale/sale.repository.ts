import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  endOfDateOnly,
  startOfDateOnly,
} from '../../shared/util/date/date-only-range';
import { SaleEntity } from '../../entities/sale';
import type { SaleCheckoutItem } from '../../entities/sale/types/sale-checkout-item';
import type { SaleHistoryItem } from '../../entities/sale/types/sale-history-item';
import { PaginatedResult } from '../../shared/types/pagination';
import {
  ISaleRepository,
  SaleListFilters,
} from './interfaces/i-sale-repository';
import { Sale, SaleDocument } from './schemas/sale.schema';

function toObjectIdOrNull(
  value: string | null | undefined,
): Types.ObjectId | null {
  if (!value) {
    return null;
  }
  return new Types.ObjectId(value);
}

function mapCheckoutToDocument(checkout: SaleCheckoutItem[]) {
  return checkout.map((item) => ({
    hasSeal: item.hasSeal,
    sealId: item.sealId ?? null,
    value: item.value ?? null,
    productId: toObjectIdOrNull(item.productId),
    quantity: item.quantity ?? null,
    description: item.description ?? null,
    orderId: toObjectIdOrNull(item.orderId),
  }));
}

@Injectable()
export class SaleRepository implements ISaleRepository {
  constructor(
    @InjectModel(Sale.name)
    private readonly saleModel: Model<SaleDocument>,
  ) {}

  private async getNextSequentialId(): Promise<number> {
    const latest = await this.saleModel
      .findOne({ sequentialId: { $ne: null } })
      .sort({ sequentialId: -1 })
      .select('sequentialId')
      .lean()
      .exec();

    return (latest?.sequentialId ?? 0) + 1;
  }

  async create(data: SaleEntity): Promise<SaleEntity> {
    const sequentialId = await this.getNextSequentialId();

    const created = await this.saleModel.create({
      sequentialId,
      clientId: new Types.ObjectId(data.clientId),
      sellerId: new Types.ObjectId(data.sellerId),
      storeId: new Types.ObjectId(data.storeId),
      architectId: toObjectIdOrNull(data.architectId),
      architectParticipation: data.architectParticipation,
      createdAt: data.createdAt,
      obsReceipt: data.obsReceipt,
      obsInternal: data.obsInternal,
      type: data.type,
      changeCredit: data.changeCredit,
      plots: data.plots,
      paymentMethod: data.paymentMethod,
      paidAt: data.paidAt,
      checkout: mapCheckoutToDocument(data.checkout),
      history: data.history.map((entry) => ({
        userId: new Types.ObjectId(entry.userId),
        createdAt: entry.createdAt,
        data: entry.data,
      })),
    });

    return SaleEntity.fromPersistData(created);
  }

  async findById(id: string): Promise<SaleEntity | null> {
    const sale = await this.saleModel.findById(id).exec();
    return sale ? SaleEntity.fromPersistData(sale) : null;
  }

  async update(
    id: string,
    data: SaleEntity,
    historyEntry?: SaleHistoryItem,
  ): Promise<SaleEntity | null> {
    const updateQuery: Record<string, unknown> = {
      $set: {
        clientId: new Types.ObjectId(data.clientId),
        sellerId: new Types.ObjectId(data.sellerId),
        storeId: new Types.ObjectId(data.storeId),
        architectId: toObjectIdOrNull(data.architectId),
        architectParticipation: data.architectParticipation,
        obsReceipt: data.obsReceipt,
        obsInternal: data.obsInternal,
        type: data.type,
        changeCredit: data.changeCredit,
        plots: data.plots,
        paymentMethod: data.paymentMethod,
        paidAt: data.paidAt,
        checkout: mapCheckoutToDocument(data.checkout),
      },
    };

    if (historyEntry) {
      updateQuery.$push = {
        history: {
          userId: new Types.ObjectId(historyEntry.userId),
          createdAt: historyEntry.createdAt,
          data: historyEntry.data,
        },
      };
    }

    const sale = await this.saleModel
      .findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
      .exec();

    return sale ? SaleEntity.fromPersistData(sale) : null;
  }

  async findPaginated(
    filters: SaleListFilters,
    pagination: { page: number; limit: number },
  ): Promise<PaginatedResult<SaleEntity>> {
    const query: FilterQuery<SaleDocument> = {};

    if (filters.createdAtFrom || filters.createdAtTo) {
      query.createdAt = {};
      if (filters.createdAtFrom) {
        query.createdAt.$gte = startOfDateOnly(filters.createdAtFrom);
      }
      if (filters.createdAtTo) {
        query.createdAt.$lte = endOfDateOnly(filters.createdAtTo);
      }
    }

    if (filters.isPaid === true) {
      query.paidAt = { $ne: null };
    } else if (filters.isPaid === false) {
      query.paidAt = null;
    }

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.clientId) {
      query.clientId = new Types.ObjectId(filters.clientId);
    }

    if (filters.sellerId) {
      query.sellerId = new Types.ObjectId(filters.sellerId);
    }

    if (filters.storeId) {
      query.storeId = new Types.ObjectId(filters.storeId);
    }

    if (filters.architectId) {
      query.architectId = new Types.ObjectId(filters.architectId);
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [total, sales] = await Promise.all([
      this.saleModel.countDocuments(query).exec(),
      this.saleModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: sales.map((sale) => SaleEntity.fromPersistData(sale)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }
}
