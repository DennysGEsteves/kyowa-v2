import { AdminAuthProvider } from "@/contexts/Auth/auth-provider";
import { AdminMobileMenuProvider } from "@/layout/admin-mobile-menu";
import { AdminShell } from "@/layout/admin-shell";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminAuthProvider>
      <AdminMobileMenuProvider>
        <AdminShell>{children}</AdminShell>
      </AdminMobileMenuProvider>
    </AdminAuthProvider>
  );
}
