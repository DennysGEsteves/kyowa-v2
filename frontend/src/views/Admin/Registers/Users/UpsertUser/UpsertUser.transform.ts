import { formatPhoneBR } from "@/util/masks";
import type { User } from "@entities";
import type { UpsertUserDTO } from "@/api/Users";
import type { UserFormSchema } from "./UpsertUser.schema";

export function userToFormValues(
  user: User,
  defaultStoreId = "",
): UserFormSchema {
  return {
    name: user.name,
    email: user.email,
    phone: formatPhoneBR(user.phone ?? ""),
    login: user.login ?? "",
    permission: user.permission,
    storeId: user.storeId ?? defaultStoreId,
    active: user.active,
  };
}

export function formValuesToUpsertUserDTO(
  values: UserFormSchema,
): UpsertUserDTO {
  return {
    name: values.name,
    email: values.email.toLowerCase(),
    phone: values.phone,
    login: values.login,
    permission: values.permission,
    storeId: values.storeId || undefined,
    active: values.active,
  };
}
