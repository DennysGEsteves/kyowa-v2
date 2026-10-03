"use client";

import { useLogout } from "@/contexts/Auth/auth-provider";
import { useAdminMobileMenu } from "./MobileMenu";
import { AdminNavSections } from "./NavSections";
import { LogOut, X } from "lucide-react";
import { KyowaLogo } from "@images";

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const logout = useLogout();
  const { closeMenu } = useAdminMobileMenu();

  function handleNavClick() {
    onNavigate?.();
    closeMenu();
  }

  function handleLogout() {
    closeMenu();
    logout();
  }

  return (
    <aside className="flex h-full flex-col bg-kyowa-maroon text-white shadow-xl lg:shadow-none">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-6 sm:px-6 sm:py-8">
        <div className="min-w-0">
          <KyowaLogo
            variant="light"
            className="scale-90 origin-left sm:scale-100"
          />
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/70 sm:mt-4 sm:text-xs">
            Painel administrativo
          </p>
        </div>
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Fechar menu"
          className="rounded-sm p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto overscroll-contain px-2 py-5 sm:px-3 sm:py-6">
        <AdminNavSections onNavigate={handleNavClick} />
      </nav>

      <div className="border-t border-white/10 p-3 sm:p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-sm px-3 py-3 text-sm text-white/85 transition hover:bg-white/10 hover:text-white sm:px-4"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.75} />
          Sair
        </button>
      </div>
    </aside>
  );
}
