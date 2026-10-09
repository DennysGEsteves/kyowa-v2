import { AdminAuthProvider } from "@/contexts/Auth/auth-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imprimir Recibo de Venda",
};

export default function ImprimirLayout({ children }: LayoutProps<"/imprimir">) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
