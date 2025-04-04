import type { User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Register/Users/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { userId } = await params;
  let user: User | undefined = undefined;

  const { usersRepository } = useRepositorySSR(token);

  if (userId !== "novo") {
    user = await usersRepository.getById(Number(userId));
  }

  return <Upsert user={user} />;
}
