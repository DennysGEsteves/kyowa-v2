import type { UserPermission } from "@entities";

export type ModuleId =
  | "stores"
  | "providers"
  | "architects"
  | "clients"
  | "users"
  | "products"
  | "stock";

export type UserPermissionModules = {
  CADASTROS?: ModuleId[];
  PRODUTOS?: ModuleId[];
};

export const userPermissionModules: Record<
  UserPermission,
  UserPermissionModules
> = {
  admin: {
    CADASTROS: ["users", "stores", "providers", "architects", "clients"],
    PRODUTOS: ["products", "stock"],
  },
  manager: {
    CADASTROS: ["users", "stores", "providers", "architects", "clients"],
    PRODUTOS: ["products", "stock"],
  },
  sales: {},
  operational: {},
  finance: {},
};

const MODULE_PATH_PREFIXES: readonly { module: ModuleId; prefix: string }[] = [
  { module: "users", prefix: "/admin/usuarios" },
  { module: "stores", prefix: "/admin/nossas-lojas" },
  { module: "providers", prefix: "/admin/fornecedores" },
  { module: "architects", prefix: "/admin/arquitetos" },
  { module: "clients", prefix: "/admin/clientes" },
  { module: "products", prefix: "/admin/produtos" },
  { module: "stock", prefix: "/admin/estoque" },
];

export type AdminRouteRequirement = ModuleId | "dashboard" | "sealLookup";

const SEAL_LOOKUP_PREFIX = "/admin/consulta-lacre";

export function getAdminRouteRequirement(
  pathname: string,
): AdminRouteRequirement | "unknown" {
  if (pathname === "/admin" || pathname.startsWith("/admin/dashboard")) {
    return "dashboard";
  }

  if (
    pathname === SEAL_LOOKUP_PREFIX ||
    pathname.startsWith(`${SEAL_LOOKUP_PREFIX}/`)
  ) {
    return "sealLookup";
  }

  for (const { module, prefix } of MODULE_PATH_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return module;
    }
  }

  if (pathname.startsWith("/admin")) {
    return "unknown";
  }

  return "unknown";
}

export function getAllowedModules(permission: UserPermission): ModuleId[] {
  const modules = userPermissionModules[permission];
  return [...(modules.CADASTROS ?? []), ...(modules.PRODUTOS ?? [])];
}

export function canAccessAdminPath(
  permission: UserPermission | null | undefined,
  pathname: string,
): boolean {
  if (!permission) {
    return false;
  }

  const requirement = getAdminRouteRequirement(pathname);

  if (requirement === "dashboard") {
    return true;
  }

  if (requirement === "sealLookup") {
    return permission === "admin" || permission === "manager";
  }

  if (requirement === "unknown") {
    return false;
  }

  return getAllowedModules(permission).includes(requirement);
}
