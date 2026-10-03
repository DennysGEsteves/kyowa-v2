export type ProductLookup = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  fantasyName: string;
  nameFilter: string;
  ezId: number | null;
  providerId: string | null;
  categoryId: string | null;
  ref: string | null;
  unitId: string | null;
  colorId: string | null;
  sizeId: string | null;
  designId: string | null;
  shapeId: string | null;
  originId: string | null;
  modelId: string | null;
  ncm: string | null;
  cst: string | null;
  ean: string | null;
  buyPrice: number | null;
  sellPrice: number | null;
  hasSeals: boolean | null;
  amountStart: number | null;
  amountSold: number | null;
  amountUnlimited: boolean;
  isEcommerce?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export function formatProductPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatProductStock(product: Product): string {
  if (product.amountUnlimited) return "Ilimitado";
  const start = product.amountStart ?? 0;
  const sold = product.amountSold ?? 0;
  return String(Math.max(0, start - sold));
}
