/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertClientDTO } from "@/repositories/api/Clients/Clients.dto";
import type { IForm } from "./UpsertClientModal.schema";

export default class Transform {
  static toUpsertClientDTO(data: IForm, mid?: string): UpsertClientDTO {
    return {
      ...(mid ? { mid } : {}),
      name: data.name,
      cpf: data.cpf,
      rg: data.rg,
      birthday: data.birthday,
      occupation: data.occupation,
      email: data.email,
      address: data.address,
      phone: data.phone,
      obs: data.obs,
      interestProducts: data.interestProducts,
      origins: data.origins,
      architectId: data.architectId,
    };
  }
}
