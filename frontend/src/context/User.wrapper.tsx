import { UserProvider } from "@/context/User.context";
import { getUser } from "@/services/Session/Session";

export default async function UserProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return <UserProvider user={user}>{children}</UserProvider>;
}
