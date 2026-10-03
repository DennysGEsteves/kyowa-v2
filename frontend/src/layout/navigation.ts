import { navSections } from "@/routes/adminRoutes";
import type { LucideIcon } from "lucide-react";

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
  for (const section of navSections()) {
    const hasActiveItem = section.items.some((item) =>
      pathname.startsWith(item.href),
    );
    if (hasActiveItem) {
      return section.title;
    }
  }
  return null;
}
