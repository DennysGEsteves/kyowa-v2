import type { CreateSaleDTO, UpdateSaleDTO } from "@/api/Sales";
import { isSaleClosed, type Product, type Sale, type SaleCheckoutItem } from "@entities";
import { formatCurrencyBRLFromNumber, parseCurrencyBRL } from "@/utils/masks";
import type {
  SaleCheckoutFormItem,
  SaleCheckoutLineKind,
  SalesFormSchema,
} from "./UpsertSale.schema";

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

function inferLineKind(item: SaleCheckoutItem): SaleCheckoutLineKind {
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

function parseCheckoutItem(
  item: SalesFormSchema["checkout"][number],
): SaleCheckoutItem {
  const value = parseCurrencyBRL(item.value.trim());

  switch (item.lineKind) {
    case "with_seal": {
      const sealId = Number(String(item.sealId ?? "").trim());
      return {
        hasSeal: true,
        sealId: Number.isInteger(sealId) ? sealId : null,
        value: value ?? null,
        productId: parseOptionalId(item.productId),
        quantity: null,
        description: null,
        orderId: null,
      };
    }
    case "linked_order":
      return {
        hasSeal: false,
        sealId: null,
        value: value ?? null,
        productId: null,
        quantity: null,
        description: null,
        orderId: parseOptionalId(item.orderId),
      };
    case "loose": {
      const quantity = Number(String(item.quantity ?? "").trim());
      return {
        hasSeal: false,
        sealId: null,
        value: value ?? null,
        productId: null,
        quantity: Number.isInteger(quantity) ? quantity : null,
        description: item.description.trim() || null,
        orderId: null,
      };
    }
    case "without_seal":
    default: {
      const quantity = Number(String(item.quantity ?? "").trim());
      return {
        hasSeal: false,
        sealId: null,
        value: value ?? null,
        productId: parseOptionalId(item.productId),
        quantity: Number.isInteger(quantity) ? quantity : null,
        description: null,
        orderId: null,
      };
    }
  }
}

function checkoutItemToFormValues(
  item: SaleCheckoutItem,
  products: Product[],
): SaleCheckoutFormItem {
  const lineKind = inferLineKind(item);
  const product = item.productId
    ? products.find((entry) => entry.id === item.productId)
    : undefined;

  return {
    lineKind,
    sealId: item.sealId != null ? String(item.sealId) : "",
    sealProductName:
      lineKind === "with_seal" && item.productId
        ? formatSealLinkedProductLabel(
            item.productId,
            product?.name ?? "",
            product?.sellPrice ?? null,
            products,
          )
        : "",
    value: item.value != null ? formatCurrencyBRLFromNumber(item.value) : "",
    categoryId: product?.categoryId ?? "",
    productId: item.productId ?? "",
    quantity: item.quantity != null ? String(item.quantity) : "1",
    orderId: item.orderId ?? "",
    description: item.description ?? "",
  };
}

const SALE_PAYMENT_NULL_FIELDS = {
  changeCredit: null,
  plots: null,
  paymentMethod: null,
} as const;

function resolvePaidAt(
  isPaid: boolean,
  existingPaidAt?: string | null,
): string | null {
  if (!isPaid) {
    return null;
  }
  if (existingPaidAt) {
    return existingPaidAt;
  }
  return new Date().toISOString();
}

function buildPaymentPayload(
  values: SalesFormSchema,
  existingPaidAt?: string | null,
) {
  return {
    ...SALE_PAYMENT_NULL_FIELDS,
    paidAt: resolvePaidAt(values.isPaid, existingPaidAt),
  };
}

export function saleToFormValues(
  sale: Sale,
  products: Product[],
): SalesFormSchema {
  return {
    clientId: sale.clientId,
    sellerId: sale.sellerId,
    storeId: sale.storeId,
    architectId: sale.architectId ?? "",
    architectParticipation: sale.architectParticipation,
    obsReceipt: sale.obsReceipt ?? "",
    obsInternal: sale.obsInternal ?? "",
    isPaid: isSaleClosed(sale),
    checkout: sale.checkout.map((item) =>
      checkoutItemToFormValues(item, products),
    ),
  };
}

export function formValuesToCreateSaleDTO(
  values: SalesFormSchema,
): CreateSaleDTO {
  return {
    clientId: values.clientId,
    sellerId: values.sellerId,
    storeId: values.storeId,
    architectId: parseOptionalId(values.architectId),
    architectParticipation: values.architectParticipation,
    obsReceipt: values.obsReceipt.trim() || null,
    obsInternal: values.obsInternal.trim() || null,
    type: "sale",
    ...buildPaymentPayload(values),
    checkout: values.checkout.map(parseCheckoutItem),
  };
}

export function formValuesToUpdateSaleDTO(
  values: SalesFormSchema,
  existingPaidAt?: string | null,
): UpdateSaleDTO {
  return {
    clientId: values.clientId,
    sellerId: values.sellerId,
    storeId: values.storeId,
    architectId: parseOptionalId(values.architectId),
    architectParticipation: values.architectParticipation,
    obsReceipt: values.obsReceipt.trim() || null,
    obsInternal: values.obsInternal.trim() || null,
    ...buildPaymentPayload(values, existingPaidAt),
    checkout: values.checkout.map(parseCheckoutItem),
  };
}
