import type {
  SaleCheckoutItem,
  SalePaymentMethod,
  SaleType,
} from "@entities";

export type ListSalesParams = {
  page?: number;
  limit?: number;
  createdAtFrom?: string;
  createdAtTo?: string;
  isPaid?: boolean;
  type?: SaleType;
  clientId?: string;
  sellerId?: string;
  storeId?: string;
  architectId?: string;
};

export type CreateSaleDTO = {
  clientId: string;
  sellerId: string;
  storeId: string;
  architectId?: string | null;
  architectParticipation?: boolean;
  obsReceipt?: string | null;
  obsInternal?: string | null;
  type: SaleType;
  changeCredit?: number | null;
  plots?: number | null;
  paymentMethod?: SalePaymentMethod | null;
  paidAt?: string | null;
  checkout?: SaleCheckoutItem[];
  createdAt?: string;
};

export type UpdateSaleDTO = {
  clientId?: string;
  sellerId?: string;
  storeId?: string;
  architectId?: string | null;
  architectParticipation?: boolean;
  obsReceipt?: string | null;
  obsInternal?: string | null;
  type?: SaleType;
  changeCredit?: number | null;
  plots?: number | null;
  paymentMethod?: SalePaymentMethod | null;
  paidAt?: string | null;
  checkout?: SaleCheckoutItem[];
};
