import type { Role } from "@/types";

export type UpsertUserDTO = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  storeId: string;
  role: Role;
  login: string;
};
