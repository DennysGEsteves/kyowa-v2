import { useProvidersQuery } from "@/api/Providers/providers.query";
import type { Provider } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { getProviderTableColumns } from "./Providers.props";

export function ProvidersLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Provider | undefined>();
  const [deleteProvider, setDeleteProvider] = useState<Provider | null>(null);

  const {
    data: providers = [],
    isLoading,
    isError,
    refetch,
  } = useProvidersQuery();

  const openCreate = useCallback(() => {
    setEditingProvider(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((provider: Provider) => {
    setEditingProvider(provider);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getProviderTableColumns(openEdit, (provider) =>
        setDeleteProvider(provider),
      ),
    [openEdit],
  );

  return {
    data: {
      providers,
      columns,
      formOpen,
      editingProvider,
      deleteProvider,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchProviders: refetch,
      setFormOpen,
      setEditingProvider,
      setDeleteProvider,
    },
  };
}
