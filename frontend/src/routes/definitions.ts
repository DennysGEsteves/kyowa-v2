import type { Role } from "@/types";
import { Routes } from "./routes";

export type Modules =
  | "GERAL"
  | "CADASTROS"
  | "PRODUTOS"
  | "COMERCIAL_VENDAS"
  | "SERVICOS"
  | "FINANCEIRO";

export const getRoutesByUserRole = (role: Role) => {
  const permissions = {
    ADMIN: [
      Routes.GERAL,
      Routes.CADASTROS,
      Routes.PRODUTOS,
      Routes.COMERCIAL_VENDAS,
      Routes.SERVICOS,
      Routes.FINANCEIRO,
    ],
  };

  return permissions[role];
};
