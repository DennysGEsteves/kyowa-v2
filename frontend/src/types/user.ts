import type { Role } from "./roles";

export type User = {
  name: string;
  email: string;
  role: Role;
  token: string;
  status?: string;
  id?: number;
  phone?: string;
  login?: string;
  storeId?: string;
  active?: boolean;
  // architects?: a;
  // managerStores?: [];
};
