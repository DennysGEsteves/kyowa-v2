import type { Role } from "@/@types";
import type { RoutesType } from "./routes";
import { Routes } from "./routes";

export type Module =
  | "GERAL"
  | "CADASTROS"
  | "PRODUTOS"
  | "COMERCIAL_VENDAS"
  | "SERVICOS"
  | "FINANCEIRO";

export const getRoutesByUserRole = (role: Role) => {
  const permissions: Record<Role, RoutesType[]> = {
    ADMIN: [
      Routes.GERAL,
      Routes.CADASTROS,
      Routes.PRODUTOS,
      Routes.COMERCIAL_VENDAS,
      Routes.SERVICOS,
      Routes.FINANCEIRO,
    ],
    FINANCE: [],
    MANAGER: [Routes.PRODUTOS, Routes.COMERCIAL_VENDAS, Routes.SERVICOS],
    OPERATIONAL: [],
    SALES: [],
  };

  return permissions[role] as RoutesType[];
};
