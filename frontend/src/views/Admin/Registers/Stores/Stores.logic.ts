import { useUsersQuery } from "@/api/Users/users.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Store } from "@entities";
import { useMemo, useState } from "react";
import { buildManagerNameLookup, getStoreTableColumns } from "./Stores.props";

export function StoresLogic() {
  const [deleteStore, setDeleteStore] = useState<Store | null>(null);

  const {
    data: stores = [],
    isLoading,
    isError,
    refetch,
  } = useStoresQuery();
  const { data: users = [] } = useUsersQuery();

  const getManagerName = useMemo(
    () => buildManagerNameLookup(users),
    [users],
  );

  const columns = useMemo(
    () =>
      getStoreTableColumns(
        (store) => adminRoutes.stores.edit(store.id),
        (store) => setDeleteStore(store),
        getManagerName,
      ),
    [getManagerName],
  );

  return {
    data: {
      stores,
      columns,
      deleteStore,
      isLoading,
      isError,
    },
    methods: {
      refetchStores: refetch,
      setDeleteStore,
    },
  };
}
