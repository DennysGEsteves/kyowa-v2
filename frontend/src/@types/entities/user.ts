export type UserPermission =
  | "admin"
  | "manager"
  | "sales"
  | "operational"
  | "finance";

export type User = {
  id: string;
  email: string;
  name: string;
  pass?: string;
  phone: string | null;
  login: string | null;
  permission: UserPermission;
  storeId: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const permissionLabels: Record<UserPermission, string> = {
  admin: "Administrador",
  manager: "Gerente",
  sales: "Vendas",
  operational: "Operacional",
  finance: "Financeiro",
};

export const userPermissions = Object.keys(
  permissionLabels,
) as UserPermission[];
