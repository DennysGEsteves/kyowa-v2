export type Role = "ADMIN" | "MANAGER" | "SALES" | "OPERATIONAL" | "FINANCE";

export const RoleTranslated: Record<Role, string> = {
  ADMIN: "Administrador",
  MANAGER: "Gerente",
  SALES: "Vendas",
  OPERATIONAL: "Operacional",
  FINANCE: "Financeiro",
};

export type User = {
  mid: string;
  id: number;
  name: string;
  email: string;
  role: Role;
  token: string;
  phone?: string;
  login?: string;
  storeId?: string;
  active?: boolean;
  // architects?: a;
  // managerStores?: [];
};
