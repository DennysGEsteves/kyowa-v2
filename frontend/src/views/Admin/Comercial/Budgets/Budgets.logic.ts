import { useBudgetsPaginatedQuery } from "@/api/Budgets/budgets.query";
import { useCallback, useMemo, useState } from "react";
import type { BudgetsListFilters } from "./components/BudgetsFilters";
import { getBudgetTableColumns } from "./Budgets.props";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: BudgetsListFilters = {
  hasActiveFilters: false,
};

export function BudgetsLogic() {
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] =
    useState<BudgetsListFilters>(INITIAL_LIST_FILTERS);

  const handleListFiltersChange = useCallback((next: BudgetsListFilters) => {
    setListFilters(next);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      createdAtFrom: listFilters.createdAtFrom,
      createdAtTo: listFilters.createdAtTo,
      status: listFilters.status,
      userId: listFilters.userId,
      architectId: listFilters.architectId,
      clientId: listFilters.clientId,
      storeId: listFilters.storeId,
      closingAt: listFilters.closingAt,
      closingLevel: listFilters.closingLevel,
    }),
    [page, listFilters],
  );

  const {
    data: paginated,
    isLoading: isBudgetsLoading,
    isFetching,
    isError: isBudgetsError,
  } = useBudgetsPaginatedQuery(queryParams);

  const { lookups, isLoading: isLookupsLoading } =
    useClientStoreArchitectLookups();

  const budgets = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () => getBudgetTableColumns(lookups),
    [lookups],
  );

  const isLoading = isBudgetsLoading || isLookupsLoading;

  return {
    data: {
      budgets,
      columns,
      meta,
      isLoading,
      isFetching,
      isError: isBudgetsError,
      hasActiveFilters: listFilters.hasActiveFilters,
    },
    methods: {
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
