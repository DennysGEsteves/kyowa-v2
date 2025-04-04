import type { Client, User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Register/Clients/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { clientId } = await params;
  let client: Client | undefined = undefined;

  const { clientsRepository } = useRepositorySSR(token);

  if (clientId !== "novo") {
    client = await clientsRepository.getById(Number(clientId));
  }

  return <Upsert client={client} />;
}
