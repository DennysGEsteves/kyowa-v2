import type { ProductDescriptors } from "@/@types";

export interface IForm {
  name: string;
  fantasyName: string;
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
  descriptors?: ProductDescriptors;
}
