import { useProvidersPaginatedQuery } from "@/api/Providers/providers.query";
import { adminRoutes } from "@routes";
import type { Provider } from "@entities";
import { useCallback, useMemo, useState } from "react";
import type { ProvidersListFilters } from "./components/ProvidersFilters";
import { getProviderTableColumns } from "./Providers.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: ProvidersListFilters = {
  hasActiveFilters: false,
};

export function ProvidersLogic() {
  const [deleteProvider, setDeleteProvider] = useState<Provider | null>(null);
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] =
    useState<ProvidersListFilters>(INITIAL_LIST_FILTERS);

  const handleListFiltersChange = useCallback((next: ProvidersListFilters) => {
    setListFilters(next);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      name: listFilters.name,
      active: listFilters.active,
    }),
    [page, listFilters],
  );

  const {
    data: paginated,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useProvidersPaginatedQuery(queryParams);

  const providers = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

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
      meta,
      hasActiveFilters: listFilters.hasActiveFilters,
      isLoading,
      isFetching,
      isError,
    },
    methods: {
      refetchProviders: refetch,
      setDeleteProvider,
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
