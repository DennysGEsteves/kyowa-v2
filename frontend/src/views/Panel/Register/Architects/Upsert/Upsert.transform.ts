/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertArchitectDTO } from "@/repositories/api/Architects/Architects.dto";
import type { IForm } from "./Upsert.schema";

export default class Transform {
  static toUpsertArchitectDTO(data: IForm, mid?: string): UpsertArchitectDTO {
    return {
      ...(mid ? { mid } : {}),
      name: data.name,
      cpf: data.cpf,
      birthday: data.birthday,
      email: data.email,
      address: data.address,
      phone: data.phone,
      obs: data.obs,
      sellerId: data.sellerId,
    };
  }
}
