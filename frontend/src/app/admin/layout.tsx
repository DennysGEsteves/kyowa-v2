import { AdminAuthProvider } from "@/contexts/Auth/auth-provider";
import { AdminMobileMenuProvider } from "@/app/(layout)/MobileMenu";
import { AdminShell } from "@/app/(layout)/Shell";

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <AdminAuthProvider>
      <AdminMobileMenuProvider>
        <AdminShell>{children}</AdminShell>
      </AdminMobileMenuProvider>
    </AdminAuthProvider>
  );
}
