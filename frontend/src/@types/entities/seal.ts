export type SealStatus = "stock" | "sale" | "consignment" | "budget";

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
  consignment: "Consignação",
  budget: "Orçamento",
};

export const sealNumberTagClass =
  "inline-flex items-center rounded-sm border border-kyowa-border bg-kyowa-surface px-2 py-1 text-sm font-medium text-kyowa-ink";

export const sealStatusBadgeClass: Record<SealStatus, string> = {
  stock:
    "inline-flex rounded-sm border border-kyowa-border bg-kyowa-surface px-2 py-0.5 text-xs font-semibold text-kyowa-muted",
  sale:
    "inline-flex rounded-sm border border-sky-200 bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-800",
  consignment:
    "inline-flex rounded-sm border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-900",
  budget:
    "inline-flex rounded-sm border border-fuchsia-200 bg-fuchsia-50 px-2 py-0.5 text-xs font-semibold text-fuchsia-900",
};
