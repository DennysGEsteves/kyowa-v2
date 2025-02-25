/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertUserDTO } from "@/repositories/Users/User.dto";
import type { IForm } from "./UpsertUserModal.schema";

export default class Transform {
  static toUpsertUserDTO(data: IForm, id?: number): UpsertUserDTO {
    return {
      ...(id ? { id } : {}),
      email: data.email,
      login: data.login,
      name: data.name,
      phone: data.phone,
      role: data.role,
      storeId: data.storeId,
    };
  }
}
