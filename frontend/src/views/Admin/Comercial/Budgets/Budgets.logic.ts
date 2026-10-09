import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useBudgetsPaginatedQuery } from "@/api/Budgets/budgets.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { useMemo, useState } from "react";
import { buildBudgetLookups, getBudgetTableColumns } from "./Budgets.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

export function BudgetsLogic() {
  const [page, setPage] = useState(1);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
    }),
    [page],
  );

  const {
    data: paginated,
    isLoading: isBudgetsLoading,
    isFetching,
    isError: isBudgetsError,
  } = useBudgetsPaginatedQuery(queryParams);

  const { data: clients = [], isLoading: isClientsLoading } = useClientsQuery();
  const { data: stores = [], isLoading: isStoresLoading } = useStoresQuery();
  const { data: architects = [], isLoading: isArchitectsLoading } =
    useArchitectsQuery();

  const budgets = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const lookups = useMemo(
    () => buildBudgetLookups(clients, stores, architects),
    [clients, stores, architects],
  );

  const columns = useMemo(
    () => getBudgetTableColumns(lookups),
    [lookups],
  );

  const isLoading =
    isBudgetsLoading ||
    isClientsLoading ||
    isStoresLoading ||
    isArchitectsLoading;

  return {
    data: {
      budgets,
      columns,
      meta,
      isLoading,
      isFetching,
      isError: isBudgetsError,
    },
    methods: {
      setPage,
    },
  };
}
