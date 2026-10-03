"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AdminMobileMenuContextValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const AdminMobileMenuContext =
  createContext<AdminMobileMenuContextValue | null>(null);

export function AdminMobileMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((value) => !value), []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AdminMobileMenuContext.Provider
      value={{ open, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </AdminMobileMenuContext.Provider>
  );
}

export function useAdminMobileMenu() {
  const context = useContext(AdminMobileMenuContext);
  if (!context) {
    throw new Error(
      "useAdminMobileMenu deve ser usado dentro de AdminMobileMenuProvider.",
    );
  }
  return context;
}
