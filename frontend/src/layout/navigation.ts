import type { LucideIcon } from "lucide-react";
import {
  HardHat,
  Package,
  Stamp,
  Store,
  Truck,
  UserRound,
  Users,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type AdminNavSection = {
  title: string;
  items: AdminNavItem[];
};

export function getActiveNavSectionTitle(pathname: string): string | null {
  for (const section of adminNavSections) {
    const hasActiveItem = section.items.some((item) =>
      pathname.startsWith(item.href),
    );
    if (hasActiveItem) {
      return section.title;
    }
  }
  return null;
}

export const adminNavSections: AdminNavSection[] = [
  {
    title: "Cadastros",
    items: [
      { href: "/admin/usuarios", label: "Usuários", icon: Users },
      { href: "/admin/fornecedores", label: "Fornecedores", icon: Truck },
      { href: "/admin/arquitetos", label: "Arquitetos", icon: HardHat },
      { href: "/admin/clientes", label: "Clientes", icon: UserRound },
      { href: "/admin/nossas-lojas", label: "Nossas Lojas", icon: Store },
    ],
  },
  {
    title: "Produtos",
    items: [
      { href: "/admin/produtos", label: "Produtos", icon: Package },
      {
        href: "/admin/cadastrar-lacras",
        label: "Cadastrar Lacras",
        icon: Stamp,
      },
    ],
  },
];
