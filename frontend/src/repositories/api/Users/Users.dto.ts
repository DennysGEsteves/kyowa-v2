import type { Role } from "@/types";

export type UpsertUserDTO = {
  mid?: string;
  name: string;
  email: string;
  phone: string;
  storeId: string;
  role: Role;
  login: string;
};
