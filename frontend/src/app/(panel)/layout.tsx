import { AuthProvider } from "@/context/Auth.context";
import { EntitiesProvider } from "@/context/Entities.context";
import { SidebarProvider } from "@/context/Sidebar.context";
import { UserProvider } from "@/context/User.context";
import LayoutContent from "@/layout/Layout";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import type { User } from "@/types";
import { Suspense } from "react";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getUser()) as User;
  const { storesRepository, usersRepository } = useRepositorySSR(user.token);
  const [stores, managers] = await Promise.all([
    storesRepository.getAll(),
    usersRepository.getAllManagers(),
  ]);

  return (
    <SidebarProvider>
      <UserProvider user={user}>
        <EntitiesProvider entities={{ stores, managers }}>
          <LayoutContent>
            <AuthProvider token={user?.token}>
              <Suspense fallback={<div>Carregando conteúdo...</div>}>
                {children}
              </Suspense>
            </AuthProvider>
          </LayoutContent>
        </EntitiesProvider>
      </UserProvider>
    </SidebarProvider>
  );
}
