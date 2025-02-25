import { AuthProvider } from "@/context/Auth.context";
import { SidebarProvider } from "@/context/Sidebar.context";
import { UserProvider } from "@/context/User.context";
import LayoutContent from "@/layout/Layout";
import { getUser } from "@/services/Session/Session";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <UserProvider user={user}>
        <LayoutContent>
          <AuthProvider token={user?.token}>{children}</AuthProvider>
        </LayoutContent>
      </UserProvider>
    </SidebarProvider>
  );
}
