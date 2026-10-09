import { AdminNavSection } from "@/app/(layout)/navigation";
import { userPermissionModules } from "./definitions";
import { getSessionUser } from "@/utils";
import {
  HardHat,
  LayoutDashboard,
  Search,
  Store,
  Truck,
  UserRound,
  Users,
  Package,
  Receipt,
  Stamp,
  Warehouse,
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
  stock: {
    href: "/admin/estoque",
    label: "Estoque",
    icon: Warehouse,
    new: "/admin/estoque/novo",
  },
  sealLookup: {
    href: "/admin/consulta-lacre",
    label: "Consulta de Lacre",
    icon: Search,
    detail: (id: string) => `/admin/consulta-lacre/${id}`,
  },
  budgets: {
    href: "/admin/orcamentos",
    label: "Orçamentos",
    icon: Receipt,
    new: "/admin/orcamentos/novo",
    edit: (id: string) => `/admin/orcamentos/${id}`,
    receipt: (id: string) => `/imprimir/orcamento/${id}`,
  },
} as const;

export const navStandaloneItems = (): AdminNavItem[] => {
  const { permission } = getSessionUser() ?? {};

  const items: AdminNavItem[] = [
    {
      href: routes.dashboard.href,
      label: routes.dashboard.label,
      icon: routes.dashboard.icon,
    },
  ];

  if (permission === "admin" || permission === "manager") {
    items.push({
      href: routes.sealLookup.href,
      label: routes.sealLookup.label,
      icon: routes.sealLookup.icon,
    });
  }

  return items;
};

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
    {
      title: "Comercial/Vendas",
      items:
        userPermissionModules[permission!].COMERCIAL_VENDAS?.map((module) => ({
          href: routes[module].href,
          label: routes[module].label,
          icon: routes[module].icon,
        })) ?? [],
    },
  ].filter((section) => section.items.length > 0) as const;
};
