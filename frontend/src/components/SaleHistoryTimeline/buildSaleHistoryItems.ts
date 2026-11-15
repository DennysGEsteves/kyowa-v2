import type { Sale, SaleHistoryItem, User } from "@entities";
import { SALE_HISTORY_EVENT_CREATED } from "./saleHistoryConstants";

export function buildSaleHistoryItems(
  sale: Sale | undefined,
  users: User[],
): SaleHistoryItem[] {
  if (!sale) {
    return [];
  }

  const entries: SaleHistoryItem[] = [...(sale.history ?? [])];

  if (!entries.some((entry) => entry.data.event === SALE_HISTORY_EVENT_CREATED)) {
    entries.push({
      userId: sale.sellerId,
      createdAt: sale.createdAt,
      userName: users.find((user) => user.id === sale.sellerId)?.name ?? "—",
      data: {
        event: SALE_HISTORY_EVENT_CREATED,
        type: sale.type,
        storeId: sale.storeId,
        clientId: sale.clientId,
        sellerId: sale.sellerId,
        architectId: sale.architectId,
      },
    });
  }

  return entries
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    )
    .map((entry) => ({
      ...entry,
      userName: users.find((user) => user.id === entry.userId)?.name ?? "—",
    }));
}