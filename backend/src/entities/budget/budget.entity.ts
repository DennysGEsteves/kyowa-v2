import { CreateBudgetDto } from '../../controllers/budget/dto/create-budget.dto';
import { UpdateBudgetDto } from '../../controllers/budget/dto/update-budget.dto';
import { BudgetDocument } from '../../repositories/budget/schemas/budget.schema';
import type { BudgetCheckoutItem } from './types/budget-checkout-item';
import type { BudgetClosingAt } from './types/budget-closing-at';
import type { BudgetClosingLevel } from './types/budget-closing-level';
import type { BudgetHistoryItem } from './types/budget-history-item';
import { BudgetStatus } from './types/budget-status';

export const BUDGET_HISTORY_EVENT_CREATED = 'created';

export function sumBudgetCheckoutTotal(checkout: BudgetCheckoutItem[]): number {
  return checkout.reduce((sum, item) => sum + item.price, 0);
}

export interface IBudgetConstructorParams {
  id?: string;
  clientId?: string | null;
  userId: string;
  storeId: string;
  architectId?: string | null;
  createdAt: Date;
  obs?: string | null;
  lostReasons?: string | null;
  total?: number | null;
  status: BudgetStatus;
  closingAt?: BudgetClosingAt | null;
  closingLevel?: BudgetClosingLevel | null;
  checkout: BudgetCheckoutItem[];
  history: BudgetHistoryItem[];
}

export class BudgetEntity {
  public id?: string;
  public clientId: string | null;
  public userId: string;
  public storeId: string;
  public architectId: string | null;
  public createdAt: Date;
  public obs: string | null;
  public lostReasons: string | null;
  public total: number | null;
  public status: BudgetStatus;
  public closingAt: BudgetClosingAt | null;
  public closingLevel: BudgetClosingLevel | null;
  public checkout: BudgetCheckoutItem[];
  public history: BudgetHistoryItem[];

  static fromCreateBudgetDto(dto: CreateBudgetDto): BudgetEntity {
    const checkout = (dto.checkout ?? []).map((item) => ({
      quantity: item.quantity,
      categoryId: item.categoryId,
      price: item.price,
      description: item.description,
    }));

    const createdAt = dto.createdAt ?? new Date();
    const status = dto.status ?? BudgetStatus.Open;

    return new BudgetEntity({
      clientId: dto.clientId ?? null,
      userId: dto.userId,
      storeId: dto.storeId,
      architectId: dto.architectId ?? null,
      createdAt,
      obs: dto.obs ?? null,
      lostReasons: dto.lostReasons ?? null,
      total: sumBudgetCheckoutTotal(checkout),
      status,
      closingAt: dto.closingAt ?? null,
      closingLevel: dto.closingLevel ?? null,
      checkout,
      history: [
        {
          userId: dto.userId,
          createdAt,
          data: {
            event: BUDGET_HISTORY_EVENT_CREATED,
            storeId: dto.storeId,
            clientId: dto.clientId ?? null,
            architectId: dto.architectId ?? null,
            status,
          },
        },
      ],
    });
  }

  static fromUpdateBudgetDto(
    current: BudgetEntity,
    dto: UpdateBudgetDto,
  ): BudgetEntity {
    const checkout =
      dto.checkout !== undefined
        ? dto.checkout.map((item) => ({
            quantity: item.quantity,
            categoryId: item.categoryId,
            price: item.price,
            description: item.description,
          }))
        : current.checkout;

    return new BudgetEntity({
      id: current.id,
      clientId:
        dto.clientId !== undefined ? dto.clientId : current.clientId,
      userId: current.userId,
      storeId: dto.storeId ?? current.storeId,
      architectId:
        dto.architectId !== undefined ? dto.architectId : current.architectId,
      createdAt: current.createdAt,
      obs: dto.obs !== undefined ? dto.obs : current.obs,
      lostReasons:
        dto.lostReasons !== undefined ? dto.lostReasons : current.lostReasons,
      total: sumBudgetCheckoutTotal(checkout),
      status: dto.status ?? current.status,
      closingAt:
        dto.closingAt !== undefined ? dto.closingAt : current.closingAt,
      closingLevel:
        dto.closingLevel !== undefined
          ? dto.closingLevel
          : current.closingLevel,
      checkout,
      history: current.history,
    });
  }

  constructor(params: IBudgetConstructorParams) {
    this.id = params.id;
    this.clientId = params.clientId ?? null;
    this.userId = params.userId;
    this.storeId = params.storeId;
    this.architectId = params.architectId ?? null;
    this.createdAt = params.createdAt;
    this.obs = params.obs ?? null;
    this.lostReasons = params.lostReasons ?? null;
    this.total = params.total ?? null;
    this.status = params.status;
    this.closingAt = params.closingAt ?? null;
    this.closingLevel = params.closingLevel ?? null;
    this.checkout = params.checkout;
    this.history = params.history;
  }

  static fromPersistData(document: BudgetDocument): BudgetEntity {
    return new BudgetEntity({
      id: document._id.toString(),
      clientId: document.clientId?.toString() ?? null,
      userId: document.userId.toString(),
      storeId: document.storeId.toString(),
      architectId: document.architectId?.toString() ?? null,
      createdAt: document.createdAt,
      obs: document.obs ?? null,
      lostReasons: document.lostReasons ?? null,
      total: document.total ?? null,
      status: document.status,
      closingAt: document.closingAt ?? null,
      closingLevel: document.closingLevel ?? null,
      checkout: document.checkout.map((item) => {
        const legacyTotal = (item as { total?: number }).total;
        return {
          quantity: item.quantity,
          categoryId: item.categoryId.toString(),
          price: item.price ?? legacyTotal ?? 0,
          description: item.description,
        };
      }),
      history: document.history.map((entry) => ({
        userId: entry.userId.toString(),
        createdAt: entry.createdAt,
        data: (entry.data ?? {}) as Record<string, unknown>,
      })),
    });
  }
}
