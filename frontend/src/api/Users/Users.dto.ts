import { UserPermission } from "@/@types/entities";

export interface UpsertUserDTO {
  name: string;
  email: string;
  permission: UserPermission;
  storeId?: string;
  phone: string;
  active: boolean;
  login: string;
}
