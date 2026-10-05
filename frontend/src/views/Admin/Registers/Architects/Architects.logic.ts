import { useArchitectsPaginatedQuery } from "@/api/Architects/architects.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { adminRoutes } from "@routes";
import type { Architect } from "@entities";
import { useCallback, useMemo, useState } from "react";
import type { ArchitectsListFilters } from "./components/ArchitectsFilters";
import {
  buildSellerNameLookup,
  getArchitectTableColumns,
} from "./Architects.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: ArchitectsListFilters = {
  hasActiveFilters: false,
};

export function ArchitectsLogic() {
  const [deleteArchitect, setDeleteArchitect] = useState<Architect | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] =
    useState<ArchitectsListFilters>(INITIAL_LIST_FILTERS);

  const handleListFiltersChange = useCallback((next: ArchitectsListFilters) => {
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
  } = useArchitectsPaginatedQuery(queryParams);
  const { data: users = [] } = useUsersQuery();

  const getSellerName = useMemo(() => buildSellerNameLookup(users), [users]);

  const architects = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () =>
      getArchitectTableColumns(
        (architect) => adminRoutes.architects.edit(architect.id),
        (architect) => setDeleteArchitect(architect),
        getSellerName,
      ),
    [getSellerName],
  );

  return {
    data: {
      architects,
      columns,
      deleteArchitect,
      meta,
      hasActiveFilters: listFilters.hasActiveFilters,
      isLoading,
      isFetching,
      isError,
    },
    methods: {
      refetchArchitects: refetch,
      setDeleteArchitect,
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
