import type { Role } from "./roles";

export type User = {
  name: string;
  email: string;
  role: Role;
  token: string;
  status?: string;
  id?: 99999999;
  phone?: null;
  login?: null;
  storeId?: null;
  active?: true;
  architects?: [];
  managerStores?: [];
};
