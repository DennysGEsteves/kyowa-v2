import type { Store, User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Register/Stores/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { storeId } = await params;
  let store: Store | undefined = undefined;

  const { storesRepository } = useRepositorySSR(token);

  if (storeId !== "novo") {
    store = await storesRepository.getById(Number(storeId));
  }

  return <Upsert store={store} />;
}
