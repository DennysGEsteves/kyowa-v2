import type { Architect, User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Register/Architects/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ architectId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { architectId } = await params;
  let architect: Architect | undefined = undefined;

  const { architectsRepository } = useRepositorySSR(token);

  if (architectId !== "novo") {
    architect = await architectsRepository.getById(Number(architectId));
  }

  return <Upsert architect={architect} />;
}
