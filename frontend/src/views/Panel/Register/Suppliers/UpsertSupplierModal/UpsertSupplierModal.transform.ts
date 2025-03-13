/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertSupplierDTO } from "@/repositories/api/Suppliers/Suppliers.dto";
import type { IForm } from "./UpsertSupplierModal.schema";

export default class Transform {
  static toUpsertSupplierDTO(data: IForm, mid?: string): UpsertSupplierDTO {
    return {
      ...(mid ? { mid } : {}),
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      obs: data.obs,
      cnpj: data.cnpj,
      ie: data.ie,
      im: data.im,
    };
  }
}
