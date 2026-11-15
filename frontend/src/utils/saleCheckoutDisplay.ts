import type { Product, SaleCheckoutItem } from "@entities";
import { formatCurrencyBRLFromNumber } from "@/utils/masks";

export type SaleCheckoutLineKind =
  | "with_seal"
  | "without_seal"
  | "linked_order"
  | "loose";

export const saleCheckoutLineKindLabels: Record<SaleCheckoutLineKind, string> =
  {
    with_seal: "Item com lacre",
    without_seal: "Item sem lacre",
    linked_order: "Pedido vinculado",
    loose: "Item avulso",
  };

export function inferSaleCheckoutLineKind(
  item: SaleCheckoutItem,
): SaleCheckoutLineKind {
  if (item.orderId) {
    return "linked_order";
  }
  if (item.description?.trim()) {
    return "loose";
  }
  if (item.hasSeal) {
    return "with_seal";
  }
  return "without_seal";
}

export function productDisplayName(product: Product): string {
  if (product.fantasyName && product.fantasyName !== product.name) {
    return `${product.name} (${product.fantasyName})`;
  }
  return product.name;
}

export type SaleCheckoutProductResolver = (
  productId: string | undefined,
) => string;

export function resolveSaleCheckoutItemDescription(
  item: SaleCheckoutItem,
  getProductName: SaleCheckoutProductResolver,
): string {
  const lineKind = inferSaleCheckoutLineKind(item);

  if (lineKind === "loose") {
    return item.description?.trim() || "Item avulso";
  }

  if (lineKind === "linked_order" && item.orderId) {
    return `Pedido ${item.orderId}`;
  }

  if (item.productId) {
    const name = getProductName(item.productId);
    if (name !== "—") {
      if (lineKind === "with_seal" && item.sealId != null) {
        return `${name} (lacre nº ${item.sealId})`;
      }
      return name;
    }
  }

  if (lineKind === "with_seal" && item.sealId != null) {
    return `Lacre nº ${item.sealId}`;
  }

  return "Item";
}

export function formatSaleCheckoutItemHistoryLine(
  item: SaleCheckoutItem,
  getProductName: SaleCheckoutProductResolver,
): string {
  const kindLabel = saleCheckoutLineKindLabels[inferSaleCheckoutLineKind(item)];
  const quantity = item.quantity ?? 1;
  const price = item.value ?? 0;
  const description = resolveSaleCheckoutItemDescription(item, getProductName);
  return `${kindLabel} — ${quantity}× ${description} — ${formatCurrencyBRLFromNumber(price)}`;
}

function saleCheckoutItemSignature(item: SaleCheckoutItem): string {
  return JSON.stringify({
    hasSeal: item.hasSeal,
    sealId: item.sealId ?? null,
    value: item.value ?? null,
    productId: item.productId ?? null,
    quantity: item.quantity ?? null,
    description: item.description?.trim() ?? null,
    orderId: item.orderId ?? null,
  });
}

function parseHistoryCheckout(value: unknown): SaleCheckoutItem[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value as SaleCheckoutItem[];
}

export function buildSaleCheckoutHistoryLines(
  previousCheckout: unknown,
  nextCheckout: unknown,
  getProductName: SaleCheckoutProductResolver,
): string[] {
  const previous = parseHistoryCheckout(previousCheckout);
  const next = parseHistoryCheckout(nextCheckout);

  if (
    JSON.stringify(previous) === JSON.stringify(next)
  ) {
    return [];
  }

  const lines: string[] = ["Itens do checkout atualizados:"];
  const remainingPrev = [...previous];
  const added: SaleCheckoutItem[] = [];

  for (const item of next) {
    const signature = saleCheckoutItemSignature(item);
    const matchIndex = remainingPrev.findIndex(
      (entry) => saleCheckoutItemSignature(entry) === signature,
    );
    if (matchIndex >= 0) {
      remainingPrev.splice(matchIndex, 1);
    } else {
      added.push(item);
    }
  }

  const removed = remainingPrev;

  for (const item of added) {
    lines.push(
      `Adicionado: ${formatSaleCheckoutItemHistoryLine(item, getProductName)}`,
    );
  }
  for (const item of removed) {
    lines.push(
      `Removido: ${formatSaleCheckoutItemHistoryLine(item, getProductName)}`,
    );
  }

  if (added.length === 0 && removed.length === 0) {
    for (const item of next) {
      lines.push(
        `• ${formatSaleCheckoutItemHistoryLine(item, getProductName)}`,
      );
    }
  }

  return lines;
}