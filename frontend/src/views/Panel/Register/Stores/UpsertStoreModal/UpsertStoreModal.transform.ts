/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertStoreDTO } from "@/repositories/api/Stores/Stores.dto";
import type { IForm } from "./UpsertStoreModal.schema";

export default class Transform {
  static toUpsertStoreDTO(data: IForm, id?: number): UpsertStoreDTO {
    return {
      ...(id ? { id } : {}),
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      obs: data.obs,
      managerId: data.managerId,
    };
  }
}
