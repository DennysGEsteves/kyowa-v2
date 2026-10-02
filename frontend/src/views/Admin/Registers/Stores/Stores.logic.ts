import { useUsersQuery } from "@/api/Users/users.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import type { Store } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { buildManagerNameLookup, getStoreTableColumns } from "./Stores.props";

export function StoresLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | undefined>();
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

  const openCreate = useCallback(() => {
    setEditingStore(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((store: Store) => {
    setEditingStore(store);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getStoreTableColumns(openEdit, (store) => setDeleteStore(store), getManagerName),
    [openEdit, getManagerName],
  );

  return {
    data: {
      stores,
      columns,
      formOpen,
      editingStore,
      deleteStore,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchStores: refetch,
      setFormOpen,
      setEditingStore,
      setDeleteStore,
    },
  };
}
