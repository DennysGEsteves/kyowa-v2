import type { Store } from "@/@types/store";
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_STORES_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { searchKeys, tableColumns } from "./Stores.props";

export const useLogic = () => {
  const router = useRouter();
  const { storesRepository } = useRepository();
  const { managers } = useEntitiesContext();

  const { data: stores } = useQuery({
    queryKey: [GET_STORES_REFETCH_TAG],
    queryFn: storesRepository.getAll,
  });

  const goToUpsert = (store?: Store) => {
    router.push(`/cadastros/lojas/${store?.id ?? "novo"}`);
  };

  const tableColumnsData = tableColumns({
    goToUpsert,
    managers,
  });

  return {
    data: {
      tableData: {
        items: stores || [],
        columns: tableColumnsData,
        search: true,
        searchKeys: searchKeys,
      },
    },
    methods: {
      goToUpsert,
    },
  };
};
