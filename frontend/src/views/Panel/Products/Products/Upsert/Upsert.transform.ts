/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertProductDTO } from "@/repositories/api/Products/Products.dto";
import type { IForm } from "./Upsert.schema";

export default class Transform {
  static toUpsertProductDTO(data: IForm, mid?: string): UpsertProductDTO {
    return {
      ...(mid ? { mid } : {}),
      name: data.name,
      fantasyName: data.fantasyName,
      ref: data.ref,
      ncm: data.ncm,
      cst: data.cst,
      ean: data.ean,
      buyBrice: data.buyBrice,
      sellPrice: data.sellPrice,
      hasSeals: data.hasSeals,
      amountStart: data.amountStart,
      amountSold: data.amountSold,
      isAmountUnlimited: data.isAmountUnlimited,
      supplierId: data.supplierId,
      descriptors: data.descriptors,
    };
  }
}
