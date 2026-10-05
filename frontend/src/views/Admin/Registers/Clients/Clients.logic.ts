import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useClientsPaginatedQuery } from "@/api/Clients/clients.query";
import { routes } from "@routes";
import type { Client } from "@entities";
import { useCallback, useMemo, useState } from "react";
import type { ClientsListFilters } from "./components/ClientsFilters";
import {
  buildArchitectNameLookup,
  getClientTableColumns,
} from "./Clients.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: ClientsListFilters = {
  hasActiveFilters: false,
};

export function ClientsLogic() {
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] =
    useState<ClientsListFilters>(INITIAL_LIST_FILTERS);

  const handleListFiltersChange = useCallback((next: ClientsListFilters) => {
    setListFilters(next);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      name: listFilters.name,
      cpf: listFilters.cpf,
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
  } = useClientsPaginatedQuery(queryParams);
  const { data: architects = [] } = useArchitectsQuery();

  const getArchitectName = useMemo(
    () => buildArchitectNameLookup(architects),
    [architects],
  );

  const clients = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () =>
      getClientTableColumns(
        (client) => routes.clients.edit(client.id),
        (client) => setDeleteClient(client),
        getArchitectName,
      ),
    [getArchitectName],
  );

  return {
    data: {
      clients,
      columns,
      deleteClient,
      meta,
      hasActiveFilters: listFilters.hasActiveFilters,
      isLoading,
      isFetching,
      isError,
    },
    methods: {
      refetchClients: refetch,
      setDeleteClient,
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
