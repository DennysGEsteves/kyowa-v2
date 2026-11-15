export type SealStatus = "stock" | "sale";

/** Valores legados no banco exibidos como venda. */
const LEGACY_SALE_STATUSES = new Set(["sale", "consignment", "budget"]);

export function normalizeSealStatus(status: string): SealStatus {
  return LEGACY_SALE_STATUSES.has(status) ? "sale" : "stock";
}

export type StockSealItem = {
  id: string;
  number: number;
  status: SealStatus;
};

export type SealSearchItem = {
  id: string;
  number: number;
  status: SealStatus;
  productId: string;
  productName: string;
  sellPrice: number | null;
  storeId: string;
  storeName: string;
};

export type SealHistoryViewItem = {
  status: SealStatus;
  userId: string;
  userName: string;
  data: Record<string, unknown>;
  createdAt: string;
};

export type SealDetail = {
  id: string;
  number: number;
  status: SealStatus;
  productId: string;
  productName: string;
  productFantasyName: string | null;
  sellPrice: number | null;
  storeId: string;
  storeName: string;
  history: SealHistoryViewItem[];
  createdAt?: string;
  updatedAt?: string;
};

export const sealStatusLabels: Record<SealStatus, string> = {
  stock: "Estoque",
  sale: "Venda",
};