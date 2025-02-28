import type { Role } from "@/types";

export interface IForm {
  name: string;
  email: string;
  phone: string;
  login: string;
  role: Role;
  storeId: string;
}
