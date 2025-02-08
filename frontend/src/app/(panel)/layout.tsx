import { SidebarProvider } from "@/context/Sidebar.context";
import UserProviderWrapper from "@/context/User.wrapper";
import LayoutContent from "@/layout/Layout";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <UserProviderWrapper>
        <LayoutContent>{children}</LayoutContent>
      </UserProviderWrapper>
    </SidebarProvider>
  );
}
