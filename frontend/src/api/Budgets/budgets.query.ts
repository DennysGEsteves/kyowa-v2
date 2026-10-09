import { useApi } from "@/api/api.hook";
import type { ListBudgetsParams } from "./Budgets.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const budgetsQueryKeys = {
  all: ["budgets"] as const,
  paginated: (params: ListBudgetsParams) =>
    [...budgetsQueryKeys.all, "paginated", params] as const,
  detail: (id: string) => [...budgetsQueryKeys.all, "detail", id] as const,
};

export function useBudgetsPaginatedQuery(params: ListBudgetsParams) {
  const { budgetsApi } = useApi();

  return useQuery({
    queryKey: budgetsQueryKeys.paginated(params),
    queryFn: () => budgetsApi.getPaginated(params),
  });
}

export function useBudgetDetailQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  const { budgetsApi } = useApi();

  return useQuery({
    queryKey: budgetsQueryKeys.detail(id ?? ""),
    queryFn: () => budgetsApi.getById(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

export function useInvalidateBudgetsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: budgetsQueryKeys.all });
}
