import { AdminNavSection } from "@/app/(layout)/navigation";
import { userPermissionModules } from "./definitions";
import { getSessionUser } from "@/utils";
import {
  HardHat,
  LayoutDashboard,
  Store,
  Truck,
  UserRound,
  Users,
  Package,
  Stamp,
} from "lucide-react";
import type { AdminNavItem } from "@/app/(layout)/navigation";

export const routes = {
  dashboard: {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  stores: {
    href: "/admin/nossas-lojas",
    label: "Nossas Lojas",
    icon: Store,
    new: "/admin/nossas-lojas/novo",
    edit: (id: string) => `/admin/nossas-lojas/${id}`,
  },
  providers: {
    href: "/admin/fornecedores",
    label: "Fornecedores",
    icon: Truck,
    new: "/admin/fornecedores/novo",
    edit: (id: string) => `/admin/fornecedores/${id}`,
  },
  architects: {
    href: "/admin/arquitetos",
    label: "Arquitetos",
    icon: HardHat,
    new: "/admin/arquitetos/novo",
    edit: (id: string) => `/admin/arquitetos/${id}`,
  },
  clients: {
    href: "/admin/clientes",
    label: "Clientes",
    icon: UserRound,
    new: "/admin/clientes/novo",
    edit: (id: string) => `/admin/clientes/${id}`,
  },
  users: {
    href: "/admin/usuarios",
    label: "Usuários",
    icon: Users,
    new: "/admin/usuarios/novo",
    edit: (id: string) => `/admin/usuarios/${id}`,
  },
  products: {
    href: "/admin/produtos",
    label: "Produtos",
    icon: Package,
    new: "/admin/produtos/novo",
    edit: (id: string) => `/admin/produtos/${id}`,
    descriptors: {
      href: "/admin/produtos/descritores",
      label: "Descritores",
      icon: Stamp,
      new: "/admin/produtos/descritores/novo",
      edit: (id: string) => `/admin/produtos/descritores/${id}`,
    },
    updatePrices: {
      href: "/admin/produtos/atualizar-precos",
      label: "Atualizar Preços",
    },
  },
} as const;

export const navStandaloneItems = (): AdminNavItem[] => [
  {
    href: routes.dashboard.href,
    label: routes.dashboard.label,
    icon: routes.dashboard.icon,
  },
];

export const navSections = (): AdminNavSection[] => {
  const { permission } = getSessionUser() ?? {};

  return [
    {
      title: "Cadastros",
      items:
        userPermissionModules[permission!].CADASTROS?.map((module) => ({
          href: routes[module].href,
          label: routes[module].label,
          icon: routes[module].icon,
        })) ?? [],
    },
    {
      title: "Produtos",
      items:
        userPermissionModules[permission!].PRODUTOS?.map((module) => ({
          href: routes[module].href,
          label: routes[module].label,
          icon: routes[module].icon,
        })) ?? [],
    },
  ] as const;
};
