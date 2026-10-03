import { useProvidersQuery } from "@/api/Providers/providers.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Provider } from "@entities";
import { useMemo, useState } from "react";
import { getProviderTableColumns } from "./Providers.props";

export function ProvidersLogic() {
  const [deleteProvider, setDeleteProvider] = useState<Provider | null>(null);

  const {
    data: providers = [],
    isLoading,
    isError,
    refetch,
  } = useProvidersQuery();

  const columns = useMemo(
    () =>
      getProviderTableColumns(
        (provider) => adminRoutes.providers.edit(provider.id),
        (provider) => setDeleteProvider(provider),
      ),
    [],
  );

  return {
    data: {
      providers,
      columns,
      deleteProvider,
      isLoading,
      isError,
    },
    methods: {
      refetchProviders: refetch,
      setDeleteProvider,
    },
  };
}
