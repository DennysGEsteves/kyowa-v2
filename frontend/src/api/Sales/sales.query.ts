import { useApi } from "@/api/api.hook";
import type { ListSalesParams } from "./Sales.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const salesQueryKeys = {
  all: ["sales"] as const,
  paginated: (params: ListSalesParams) =>
    [...salesQueryKeys.all, "paginated", params] as const,
  detail: (id: string) => [...salesQueryKeys.all, "detail", id] as const,
};

export function useSalesPaginatedQuery(params: ListSalesParams) {
  const { salesApi } = useApi();

  return useQuery({
    queryKey: salesQueryKeys.paginated(params),
    queryFn: () => salesApi.getPaginated(params),
  });
}

export function useSaleDetailQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  const { salesApi } = useApi();

  return useQuery({
    queryKey: salesQueryKeys.detail(id ?? ""),
    queryFn: () => salesApi.getById(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

export function useInvalidateSalesQuery() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: salesQueryKeys.all });
  };
}
