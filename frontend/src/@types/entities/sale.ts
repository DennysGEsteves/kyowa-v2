export type SaleType = "sale" | "consignment";

export type SalePaymentMethod =
  | "money"
  | "debit"
  | "credit"
  | "financing"
  | "check"
  | "exchange"
  | "financing_store"
  | "courtesy"
  | "bank_transfer";

export type SaleCheckoutItem = {
  hasSeal: boolean;
  sealId?: number | null;
  value?: number | null;
  productId?: string | null;
  quantity?: number | null;
  description?: string | null;
  orderId?: string | null;
};

export type Sale = {
  id: string;
  sequentialId: number | null;
  clientId: string;
  sellerId: string;
  storeId: string;
  architectId: string | null;
  architectParticipation: boolean;
  createdAt: string;
  obsReceipt: string | null;
  obsInternal: string | null;
  type: SaleType;
  changeCredit: number | null;
  plots: number | null;
  paymentMethod: SalePaymentMethod | null;
  paidAt: string | null;
  checkout: SaleCheckoutItem[];
};

export const salePaymentMethodLabels: Record<SalePaymentMethod, string> = {
  money: "Dinheiro",
  debit: "Débito",
  credit: "Crédito",
  financing: "Financiamento",
  check: "Cheque",
  exchange: "Permuta",
  financing_store: "Financiamento loja",
  courtesy: "Cortesia",
  bank_transfer: "Transferência",
};

export const salePaymentMethods: SalePaymentMethod[] = [
  "money",
  "debit",
  "credit",
  "financing",
  "check",
  "exchange",
  "financing_store",
  "courtesy",
  "bank_transfer",
];

export function isSaleClosed(sale: Pick<Sale, "paidAt">): boolean {
  return sale.paidAt != null && sale.paidAt !== "";
}

export const saleOpenBadgeClass =
  "inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-sm font-semibold text-sky-800";

export const saleClosedBadgeClass =
  "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-800";

export function sumSaleCheckoutTotal(checkout: SaleCheckoutItem[]): number {
  return checkout.reduce((sum, item) => sum + (item.value ?? 0), 0);
}
