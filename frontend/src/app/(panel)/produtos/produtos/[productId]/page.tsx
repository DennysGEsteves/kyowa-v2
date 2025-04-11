import type { Product, User } from "@/@types";
import { useRepositorySSR } from "@/repositories/repositories.hook";
import { getUser } from "@/services/Session/Session";
import Upsert from "@/views/Panel/Products/Products/Upsert/Upsert.view";

export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { token } = (await getUser()) as User;
  const { productId } = await params;
  let product: Product | undefined = undefined;

  const { productsRepository } = useRepositorySSR(token);

  if (productId !== "novo") {
    product = await productsRepository.getById(Number(productId));
  }

  return <Upsert product={product} />;
}
