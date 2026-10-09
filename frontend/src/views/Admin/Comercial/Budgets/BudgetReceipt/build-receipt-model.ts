import type { Address, Budget, Client, User } from "@entities";
import { formatCurrencyBRLFromNumber } from "@/utils/masks";

export type ReceiptLine = {
  quantity: number;
  description: string;
  subtotal: string;
};

export type ReceiptModel = {
  number: string;
  date: string;
  clientName: string;
  street: string;
  district: string;
  city: string;
  phones: string;
  sellerName: string;
  obs: string;
  lines: ReceiptLine[];
  total: string;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function receiptNumberFromBudgetId(id: string): string {
  if (id.length === 24) {
    return String(parseInt(id.slice(18, 24), 16));
  }
  return id.slice(-6).toUpperCase();
}

function streetLine(address: Address | null | undefined): string {
  if (!address) return "";
  return [address.street, address.number].filter(Boolean).join(", ");
}

function phonesLine(client: Client | undefined): string {
  if (!client) return "";
  return [client.phone1, client.phone2].filter(Boolean).join(" / ");
}

export function buildReceiptModel(
  budget: Budget,
  ctx: {
    client?: Client;
    seller?: User;
    categoryNameById: Map<string, string>;
  },
): ReceiptModel {
  const address = ctx.client?.address;

  const lines = budget.checkout.map((item) => {
    const category = ctx.categoryNameById.get(item.categoryId);
    const description = category
      ? `${category} - ${item.description}`
      : item.description;

    return {
      quantity: item.quantity,
      description,
      subtotal: formatCurrencyBRLFromNumber(item.price),
    };
  });

  const totalAmount =
    budget.total ?? budget.checkout.reduce((sum, item) => sum + item.price, 0);

  return {
    number: receiptNumberFromBudgetId(budget.id),
    date: dateFormatter.format(new Date(budget.createdAt)),
    clientName: ctx.client?.name ?? "—",
    street: streetLine(address),
    district: address?.district ?? "",
    city: address?.city ?? "",
    phones: phonesLine(ctx.client),
    sellerName: ctx.seller?.name ?? "—",
    obs: budget.obs?.trim() ?? "",
    lines,
    total: `R$ ${formatCurrencyBRLFromNumber(totalAmount)}`,
  };
}
