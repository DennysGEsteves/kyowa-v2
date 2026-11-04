"use client";

import { useSaleDetailQuery } from "@/api/Sales/sales.query";
import { useProductsQuery } from "@/api/Products/products.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { Receipt, openReceiptWindow } from "@/components/Receipt";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import type { Client, Product, SaleCheckoutItem, User } from "@entities";
import { isSaleClosed } from "@entities";
import { buildReceiptNumber } from "@/utils/receipt";
import { routes } from "@routes";

type ReceiptLine = {
  quantity: number;
  description: string;
  price: number;
};

function productLabel(product: Product): string {
  if (product.fantasyName && product.fantasyName !== product.name) {
    return `${product.name} (${product.fantasyName})`;
  }
  return product.name;
}

export function saleCheckoutToReceiptLines(
  checkout: SaleCheckoutItem[],
  products: Product[],
): ReceiptLine[] {
  return checkout.map((item) => {
    const product = item.productId
      ? products.find((entry) => entry.id === item.productId)
      : undefined;
    const quantity = item.quantity ?? 1;
    const price = item.value ?? 0;

    let description = item.description?.trim() ?? "";
    if (!description && product) {
      description = productLabel(product);
    }
    if (!description && item.orderId) {
      description = "Pedido vinculado";
    }
    if (!description && item.hasSeal && item.sealId != null) {
      description = `Lacre nº ${item.sealId}`;
    }
    if (!description) {
      description = "Item";
    }

    return { quantity, description, price };
  });
}

type SaleReceiptProps = {
  saleId: string;
};

export function SaleReceipt({ saleId }: SaleReceiptProps) {
  const { data: sale } = useSaleDetailQuery(saleId);
  const { data: products = [] } = useProductsQuery();
  const { clients } = useClientStoreArchitectLookups();
  const { data: users = [] } = useUsersQuery();

  const client = clients.find((entry: Client) => entry.id === sale?.clientId) ?? null;
  const seller =
    users.find((entry: User) => entry.id === sale?.sellerId) ?? null;

  if (
    !sale ||
    sale.type !== "sale" ||
    !isSaleClosed(sale) ||
    !client ||
    !seller
  ) {
    return null;
  }

  const receiptNumber =
    sale.sequentialId != null
      ? buildReceiptNumber(sale.createdAt, sale.sequentialId)
      : "—";

  return (
    <Receipt
      client={client}
      seller={seller}
      obs={sale.obsReceipt ?? ""}
      nature="sale"
      receiptNumber={receiptNumber}
      checkout={saleCheckoutToReceiptLines(sale.checkout, products)}
      showTerms={true}
    />
  );
}

export function openSaleReceipt(saleId: string) {
  openReceiptWindow(routes.sales.receipt(saleId));
}
