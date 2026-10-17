import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import {
  endOfDateOnly,
  startOfDateOnly,
} from '../../shared/util/date/date-only-range';
import { BudgetEntity } from '../../entities/budget';
import { BudgetClosingAt } from '../../entities/budget/types/budget-closing-at';
import { PaginatedResult } from '../../shared/types/pagination';
import { BudgetHistoryItem } from '../../entities/budget/types/budget-history-item';
import {
  BudgetListFilters,
  IBudgetRepository,
} from './interfaces/i-budget-repository';
import { Budget, BudgetDocument } from './schemas/budget.schema';

function toObjectIdOrNull(
  value: string | null | undefined,
): Types.ObjectId | null {
  if (!value) {
    return null;
  }
  return new Types.ObjectId(value);
}

@Injectable()
export class BudgetRepository implements IBudgetRepository {
  constructor(
    @InjectModel(Budget.name)
    private readonly budgetModel: Model<BudgetDocument>,
  ) {}

  private async getNextSequentialId(): Promise<number> {
    const latest = await this.budgetModel
      .findOne({ sequentialId: { $ne: null } })
      .sort({ sequentialId: -1 })
      .select('sequentialId')
      .lean()
      .exec();

    return (latest?.sequentialId ?? 0) + 1;
  }

  async create(data: BudgetEntity): Promise<BudgetEntity> {
    const sequentialId = await this.getNextSequentialId();

    const created = await this.budgetModel.create({
      sequentialId,
      clientId: toObjectIdOrNull(data.clientId),
      userId: new Types.ObjectId(data.userId),
      storeId: new Types.ObjectId(data.storeId),
      architectId: toObjectIdOrNull(data.architectId),
      createdAt: data.createdAt,
      obs: data.obs,
      lostReasons: data.lostReasons,
      total: data.total,
      status: data.status,
      closingAt: data.closingAt,
      closingLevel: data.closingLevel,
      checkout: data.checkout.map((item) => ({
        quantity: item.quantity,
        categoryId: new Types.ObjectId(item.categoryId),
        price: item.price,
        description: item.description,
      })),
      history: data.history.map((entry) => ({
        userId: new Types.ObjectId(entry.userId),
        createdAt: entry.createdAt,
        data: entry.data,
      })),
    });

    return BudgetEntity.fromPersistData(created);
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    const budget = await this.budgetModel.findById(id).exec();
    return budget ? BudgetEntity.fromPersistData(budget) : null;
  }

  async update(
    id: string,
    data: BudgetEntity,
    historyEntry?: BudgetHistoryItem,
  ): Promise<BudgetEntity | null> {
    const updateQuery: Record<string, unknown> = {
      $set: {
        clientId: toObjectIdOrNull(data.clientId),
        storeId: new Types.ObjectId(data.storeId),
        architectId: toObjectIdOrNull(data.architectId),
        obs: data.obs,
        lostReasons: data.lostReasons,
        total: data.total,
        status: data.status,
        closingAt: data.closingAt,
        closingLevel: data.closingLevel,
        checkout: data.checkout.map((item) => ({
          quantity: item.quantity,
          categoryId: new Types.ObjectId(item.categoryId),
          price: item.price,
          description: item.description,
        })),
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

    const budget = await this.budgetModel
      .findByIdAndUpdate(id, updateQuery, { new: true, runValidators: true })
      .exec();

    return budget ? BudgetEntity.fromPersistData(budget) : null;
  }

  async findPaginated(
    filters: BudgetListFilters,
    pagination: {
      page: number;
      limit: number;
    },
  ): Promise<PaginatedResult<BudgetEntity>> {
    const query: FilterQuery<BudgetDocument> = {};

    if (filters.createdAtFrom || filters.createdAtTo) {
      query.createdAt = {};
      if (filters.createdAtFrom) {
        query.createdAt.$gte = startOfDateOnly(filters.createdAtFrom);
      }
      if (filters.createdAtTo) {
        query.createdAt.$lte = endOfDateOnly(filters.createdAtTo);
      }
    }

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.userId) {
      query.userId = new Types.ObjectId(filters.userId);
    }

    if (filters.architectId) {
      query.architectId = new Types.ObjectId(filters.architectId);
    }

    if (filters.clientId) {
      query.clientId = new Types.ObjectId(filters.clientId);
    }

    if (filters.storeId) {
      query.storeId = new Types.ObjectId(filters.storeId);
    }

    if (filters.closingAt) {
      if (filters.closingAt === BudgetClosingAt.None) {
        query.closingAt = { $in: [null, BudgetClosingAt.None] };
      } else {
        query.closingAt = filters.closingAt;
      }
    }

    if (filters.closingLevel) {
      query.closingLevel = filters.closingLevel;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [total, budgets] = await Promise.all([
      this.budgetModel.countDocuments(query).exec(),
      this.budgetModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: budgets.map((budget) => BudgetEntity.fromPersistData(budget)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }
}
