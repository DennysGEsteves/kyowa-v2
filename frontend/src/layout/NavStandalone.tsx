"use client";

import { navStandaloneItems } from "@routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminNavStandaloneProps = {
  onNavigate?: () => void;
};

export function AdminNavStandalone({ onNavigate }: AdminNavStandaloneProps) {
  const pathname = usePathname();
  const items = navStandaloneItems();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="mb-4 space-y-1 border-b border-white/10 pb-4">
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-sm px-3 py-3 text-sm font-medium transition sm:px-4 ${
                active
                  ? "bg-white/15 text-kyowa-gold"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
