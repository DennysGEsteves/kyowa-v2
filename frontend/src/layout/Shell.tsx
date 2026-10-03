"use client";

import { AdminSidebar } from "./Sidebar";
import { useAdminMobileMenu } from "./MobileMenu";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

type AdminShellProps = {
  children: ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  const { open, closeMenu } = useAdminMobileMenu();
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <div className="flex min-h-screen bg-kyowa-surface">
      {open ? (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMenu}
        />
      ) : null}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-[min(18rem,88vw)] transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-64 lg:shrink-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar onNavigate={closeMenu} />
      </div>

      <div className="flex min-h-screen min-h-dvh min-w-0 flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
