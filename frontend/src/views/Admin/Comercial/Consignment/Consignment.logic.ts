import { useSalesPaginatedQuery } from "@/api/Sales/sales.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { useCallback, useMemo, useState } from "react";
import { buildConsignmentLookups } from "./Consignment.lookups";
import { getConsignmentTableColumns } from "./Consignment.props";
import type { ConsignmentListFilters } from "./components/ConsignmentFilters";

const PAGE_SIZE = 10;
const CONSIGNMENT_TYPE = "consignment" as const;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: ConsignmentListFilters = {
  hasActiveFilters: false,
};

export function ConsignmentLogic() {
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] = useState<ConsignmentListFilters>(
    INITIAL_LIST_FILTERS,
  );

  const handleListFiltersChange = useCallback((next: ConsignmentListFilters) => {
    setListFilters(next);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      type: CONSIGNMENT_TYPE,
      createdAtFrom: listFilters.createdAtFrom,
      createdAtTo: listFilters.createdAtTo,
      sellerId: listFilters.userId,
      architectId: listFilters.architectId,
      clientId: listFilters.clientId,
      storeId: listFilters.storeId,
    }),
    [page, listFilters],
  );

  const {
    data: paginated,
    isLoading: isSalesLoading,
    isFetching,
    isError: isSalesError,
  } = useSalesPaginatedQuery(queryParams);

  const { lookups: baseLookups, isLoading: isLookupsLoading } =
    useClientStoreArchitectLookups();
  const { data: users = [], isLoading: isUsersLoading } = useUsersQuery();

  const lookups = useMemo(
    () => buildConsignmentLookups(baseLookups, users),
    [baseLookups, users],
  );

  const sales = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () => getConsignmentTableColumns(lookups),
    [lookups],
  );

  const isLoading = isSalesLoading || isLookupsLoading || isUsersLoading;

  return {
    data: {
      sales,
      columns,
      meta,
      isLoading,
      isFetching,
      isError: isSalesError,
      hasActiveFilters: listFilters.hasActiveFilters,
    },
    methods: {
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
