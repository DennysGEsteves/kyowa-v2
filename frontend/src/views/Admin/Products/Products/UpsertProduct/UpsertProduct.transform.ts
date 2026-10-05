import type { Product } from "@entities";
import type { CreateProductDTO, UpdateProductDTO } from "@/api/Products";
import { formatCurrencyBRLFromNumber, parseCurrencyBRL } from "@/utils/masks";
import type { ProductFormSchema } from "./UpsertProduct.schema";

function parseOptionalNumber(value: string): number | undefined {
  return parseCurrencyBRL(value);
}

function parseOptionalInt(value: string): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function optionalRelationId(
  value: string,
): string | null | undefined {
  return value ? value : null;
}

export function productToFormValues(product: Product): ProductFormSchema {
  return {
    imageFile: null,
    name: product.name,
    fantasyName: product.fantasyName,
    providerId: product.providerId ?? "",
    categoryId: product.categoryId ?? "",
    ref: product.ref ?? "",
    unitId: product.unitId ?? "",
    colorId: product.colorId ?? "",
    sizeId: product.sizeId ?? "",
    designId: product.designId ?? "",
    shapeId: product.shapeId ?? "",
    originId: product.originId ?? "",
    modelId: product.modelId ?? "",
    ncm: product.ncm ?? "",
    cst: product.cst ?? "",
    ean: product.ean ?? "",
    buyPrice:
      product.buyPrice !== null && product.buyPrice !== undefined
        ? formatCurrencyBRLFromNumber(product.buyPrice)
        : "",
    sellPrice:
      product.sellPrice !== null && product.sellPrice !== undefined
        ? formatCurrencyBRLFromNumber(product.sellPrice)
        : "",
    hasSeals: product.hasSeals ?? false,
    amountStart:
      product.amountStart !== null && product.amountStart !== undefined
        ? String(product.amountStart)
        : "",
    amountUnlimited: product.amountUnlimited,
    isEcommerce:
      product.ezId !== null && product.ezId !== undefined
        ? true
        : (product.isEcommerce ?? false),
  };
}

export function formValuesToCreateProductDTO(
  values: ProductFormSchema,
): CreateProductDTO {
  return {
    name: values.name,
    fantasyName: values.fantasyName,
    categoryId: values.categoryId || undefined,
    ref: values.ref,
    unitId: values.unitId || undefined,
    colorId: values.colorId || undefined,
    sizeId: values.sizeId || undefined,
    designId: values.designId || undefined,
    shapeId: values.shapeId || undefined,
    originId: values.originId || undefined,
    modelId: values.modelId || undefined,
    ncm: values.ncm,
    cst: values.cst,
    ean: values.ean,
    buyPrice: parseOptionalNumber(values.buyPrice),
    sellPrice: parseOptionalNumber(values.sellPrice),
    hasSeals: values.hasSeals,
    amountStart: values.hasSeals
      ? parseOptionalInt(values.amountStart)
      : undefined,
    amountUnlimited: values.hasSeals ? values.amountUnlimited : false,
    isEcommerce: values.isEcommerce,
  };
}

export function formValuesToUpdateProductDTO(
  values: ProductFormSchema,
): UpdateProductDTO {
  return {
    name: values.name,
    fantasyName: values.fantasyName,
    providerId: optionalRelationId(values.providerId),
    categoryId: optionalRelationId(values.categoryId),
    ref: values.ref || null,
    unitId: optionalRelationId(values.unitId),
    colorId: optionalRelationId(values.colorId),
    sizeId: optionalRelationId(values.sizeId),
    designId: optionalRelationId(values.designId),
    shapeId: optionalRelationId(values.shapeId),
    originId: optionalRelationId(values.originId),
    modelId: optionalRelationId(values.modelId),
    ncm: values.ncm || null,
    cst: values.cst || null,
    ean: values.ean || null,
    buyPrice: parseOptionalNumber(values.buyPrice) ?? null,
    sellPrice: parseOptionalNumber(values.sellPrice) ?? null,
    hasSeals: values.hasSeals,
    amountStart: values.hasSeals
      ? (parseOptionalInt(values.amountStart) ?? null)
      : null,
    amountUnlimited: values.hasSeals ? values.amountUnlimited : false,
    isEcommerce: values.isEcommerce,
  };
}
