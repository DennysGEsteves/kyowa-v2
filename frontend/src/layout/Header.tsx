"use client";

import { useAdminMobileMenu } from "./MobileMenu";
import type { SessionUser } from "@utils";
import { Menu } from "lucide-react";

type AdminHeaderProps = {
  title: string;
  user: SessionUser;
};

export function AdminHeader({ title, user }: AdminHeaderProps) {
  const { openMenu } = useAdminMobileMenu();

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-kyowa-border bg-white px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 lg:px-8">
      <button
        type="button"
        onClick={openMenu}
        aria-label="Abrir menu"
        className="rounded-sm p-2 text-kyowa-ink hover:bg-kyowa-surface lg:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.75} />
      </button>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
        <h1 className="truncate font-serif text-xl text-kyowa-ink sm:text-2xl">
          {title}
        </h1>
        <div className="hidden min-w-0 text-right sm:block">
          <p className="truncate text-sm font-medium text-kyowa-ink">
            {user.name}
          </p>
          <p className="truncate text-xs text-kyowa-muted">{user.email}</p>
        </div>
      </div>

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-kyowa-maroon text-xs font-semibold text-white sm:hidden">
        {user.name.charAt(0).toUpperCase()}
      </div>
    </header>
  );
}
