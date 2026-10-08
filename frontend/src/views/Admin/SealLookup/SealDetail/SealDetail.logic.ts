import { useSealDetailQuery } from "@/api/Seals/seals.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { routes } from "@routes";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

function buildProductDisplayLabel(seal: {
  productName: string;
  productFantasyName: string | null;
}) {
  if (
    seal.productFantasyName &&
    seal.productFantasyName !== seal.productName
  ) {
    return `${seal.productName} (${seal.productFantasyName})`;
  }
  return seal.productName;
}

export function useSealDetailLogic(sealId: string) {
  const router = useRouter();
  const { data: stores = [] } = useStoresQuery();

  const {
    data: seal,
    isLoading,
    isError,
    refetch,
  } = useSealDetailQuery(sealId);

  const navigateBack = useCallback(() => {
    router.push(routes.sealLookup.href);
  }, [router]);

  const storeOptions = useMemo(
    () =>
      stores.map((store) => ({
        value: store.id,
        label: store.name,
      })),
    [stores],
  );

  const productDisplayValue = seal ? buildProductDisplayLabel(seal) : "";

  return {
    seal,
    productDisplayValue,
    storeOptions,
    isLoading,
    isError,
    refetch,
    navigateBack,
  };
}
