import type { Supplier } from "./supplier";

export type ProductDescriptors = {
  category: string;
  unit: string;
  colord: string;
  size: string;
  design: string;
  shape: string;
  origin: string;
  model: string;
  height: string;
};

export type Product = {
  mid?: string;
  id?: number;
  name: string;
  fantasyName: string;
  nameFilter?: string;
  ezID?: number;
  ref?: string;
  ncm?: string;
  cst?: string;
  ean?: string;
  buyBrice?: number;
  sellPrice?: number;
  hasSeals?: boolean;
  amountStart?: number;
  amountSold?: number;
  isAmountUnlimited?: boolean;
  supplierId?: string;
  descriptors: ProductDescriptors;

  supplier?: Supplier;
};
