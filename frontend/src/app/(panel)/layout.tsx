import { AuthProvider } from "@/context/Auth.context";
import { EntitiesProvider } from "@/context/Entities.context";
import { RequestErrorDialogProvider } from "@/context/RequestErrorDialog/RequestErrorDialog.provider";
import { SidebarProvider } from "@/context/Sidebar.context";
import { UserProvider } from "@/context/User.context";
import LayoutContent from "@/layout/Layout";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import type { Store, User } from "@/@types";
import type { ApolloError } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = (await getUser()) as User;
  let stores: Store[] = [];
  let managers: User[] = [];
  const { storesRepository, usersRepository } = useRepositorySSR(user.token);

  try {
    [stores, managers] = await Promise.all([
      storesRepository.getAll(),
      usersRepository.getAll(),
    ]);
  } catch (e) {
    const error = e as ApolloError;
    console.log(error.message);
    // const message = JSON.parse(error.message);

    // if (message.statusCode === 401 && message.error === "UNAUTHORIZED") {
    //   redirect("/login");
    // }
  }

  return (
    <SidebarProvider>
      <UserProvider user={user}>
        <EntitiesProvider entities={{ stores, managers }}>
          <LayoutContent>
            <AuthProvider token={user?.token}>
              <RequestErrorDialogProvider>
                {children}
              </RequestErrorDialogProvider>
            </AuthProvider>
          </LayoutContent>
        </EntitiesProvider>
      </UserProvider>
    </SidebarProvider>
  );
}
