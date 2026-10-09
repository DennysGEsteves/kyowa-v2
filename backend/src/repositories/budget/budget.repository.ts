import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BudgetEntity } from '../../entities/budget';
import { PaginatedResult } from '../../shared/types/pagination';
import { BudgetHistoryItem } from '../../entities/budget/types/budget-history-item';
import { IBudgetRepository } from './interfaces/i-budget-repository';
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

  async create(data: BudgetEntity): Promise<BudgetEntity> {
    const created = await this.budgetModel.create({
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

  async findPaginated(pagination: {
    page: number;
    limit: number;
  }): Promise<PaginatedResult<BudgetEntity>> {
    const skip = (pagination.page - 1) * pagination.limit;

    const [total, budgets] = await Promise.all([
      this.budgetModel.countDocuments().exec(),
      this.budgetModel
        .find()
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
