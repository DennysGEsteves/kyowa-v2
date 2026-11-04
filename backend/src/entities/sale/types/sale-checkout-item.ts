export type SaleCheckoutItem = {
  hasSeal: boolean;
  sealId?: number | null;
  value?: number | null;
  productId?: string | null;
  quantity?: number | null;
  description?: string | null;
  orderId?: string | null;
};
