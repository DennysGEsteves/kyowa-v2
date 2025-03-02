/* eslint-disable @typescript-eslint/no-extraneous-class */
import type { UpsertUserDTO } from "@/repositories/api/Users/Users.dto";
import type { IForm } from "./UpsertUserModal.schema";

export default class Transform {
  static toUpsertUserDTO(data: IForm, mid?: string): UpsertUserDTO {
    return {
      ...(mid ? { mid } : {}),
      email: data.email,
      login: data.login,
      name: data.name,
      phone: data.phone,
      role: data.role,
      storeId: data.storeId,
    };
  }
}
