import type { CreateSaleDTO, UpdateSaleDTO } from "@/api/Sales";
import type { Product, Sale, SaleCheckoutItem } from "@entities";
import { formatCurrencyBRLFromNumber, parseCurrencyBRL } from "@/utils/masks";
import type { ConsignmentFormSchema } from "./UpsertConsignment.schema";

export function formatSealLinkedProductLabel(
  productId: string,
  productName: string,
  sellPrice: number | null | undefined,
  products: Product[],
): string {
  const product = products.find((entry) => entry.id === productId);
  const namePart = productName.trim() || product?.name || "—";
  const price = sellPrice ?? product?.sellPrice ?? null;
  const pricePart =
    price != null ? `R$ ${formatCurrencyBRLFromNumber(price)}` : "—";
  return `${namePart} - ${pricePart}`;
}

function parseOptionalId(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseCheckoutItem(
  item: ConsignmentFormSchema["checkout"][number],
): SaleCheckoutItem {
  const value = parseCurrencyBRL(item.value.trim());
  if (item.hasSeal === true) {
    const sealId = Number(String(item.sealId ?? "").trim());
    return {
      hasSeal: true,
      sealId: Number.isInteger(sealId) ? sealId : null,
      value: value ?? null,
      productId: parseOptionalId(item.productId),
      quantity: null,
    };
  }

  const quantity = Number(String(item.quantity ?? "").trim());
  return {
    hasSeal: false,
    sealId: null,
    value: value ?? null,
    productId: parseOptionalId(item.productId),
    quantity: Number.isInteger(quantity) ? quantity : null,
  };
}

const CONSIGNMENT_PAYMENT_FIELDS = {
  changeCredit: null,
  plots: null,
  paymentMethod: null,
  paidAt: null,
} as const;

export function saleToFormValues(
  sale: Sale,
  products: Product[],
): ConsignmentFormSchema {
  const productsById = new Map(products.map((product) => [product.id, product]));

  return {
    clientId: sale.clientId,
    sellerId: sale.sellerId,
    storeId: sale.storeId,
    architectId: sale.architectId ?? "",
    architectParticipation: sale.architectParticipation,
    obsReceipt: sale.obsReceipt ?? "",
    obsInternal: sale.obsInternal ?? "",
    checkout: sale.checkout.map((item) => {
      const product = item.productId
        ? productsById.get(item.productId)
        : undefined;

      return {
        hasSeal: item.hasSeal,
        sealId: item.sealId != null ? String(item.sealId) : "",
        sealProductName:
          item.hasSeal && item.productId
            ? formatSealLinkedProductLabel(
                item.productId,
                product?.name ?? "",
                item.value ?? product?.sellPrice ?? null,
                products,
              )
            : "",
        value:
          item.value != null ? formatCurrencyBRLFromNumber(item.value) : "",
        categoryId: product?.categoryId ?? "",
        productId: item.productId ?? "",
        quantity: item.quantity != null ? String(item.quantity) : "1",
      };
    }),
  };
}

export function formValuesToCreateSaleDTO(
  values: ConsignmentFormSchema,
): CreateSaleDTO {
  return {
    clientId: values.clientId,
    sellerId: values.sellerId,
    storeId: values.storeId,
    architectId: parseOptionalId(values.architectId),
    architectParticipation: values.architectParticipation,
    obsReceipt: values.obsReceipt.trim() || null,
    obsInternal: values.obsInternal.trim() || null,
    type: "consignment",
    ...CONSIGNMENT_PAYMENT_FIELDS,
    checkout: values.checkout.map(parseCheckoutItem),
  };
}

export function formValuesToUpdateSaleDTO(
  values: ConsignmentFormSchema,
): UpdateSaleDTO {
  return {
    clientId: values.clientId,
    sellerId: values.sellerId,
    storeId: values.storeId,
    architectId: parseOptionalId(values.architectId),
    architectParticipation: values.architectParticipation,
    obsReceipt: values.obsReceipt.trim() || null,
    obsInternal: values.obsInternal.trim() || null,
    ...CONSIGNMENT_PAYMENT_FIELDS,
    checkout: values.checkout.map(parseCheckoutItem),
  };
}
