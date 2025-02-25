import type { Role } from "./roles";

export type User = {
  name: string;
  email: string;
  role: Role;
  token: string;
  id?: number;
  phone?: string;
  login?: string;
  storeId?: string;
  active?: boolean;
  // architects?: a;
  // managerStores?: [];
};

export const RoleTypeTranslated = {
  ADMIN: "ADMINISTRADOR",
  MANAGER: "GERENTE",
  SALES: "VENDAS",
  OPERATIONAL: "OPERACIONAL",
  FINANCE: "FINANCEIRO",
};
