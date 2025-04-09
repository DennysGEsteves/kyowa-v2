import type { Supplier, User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Register/Suppliers/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ supplierId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { supplierId } = await params;
  let supplier: Supplier | undefined = undefined;

  const { suppliersRepository } = useRepositorySSR(token);

  if (supplierId !== "novo") {
    supplier = await suppliersRepository.getById(Number(supplierId));
  }

  return <Upsert supplier={supplier} />;
}
