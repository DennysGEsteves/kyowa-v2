import { useApi } from "@/api/api.hook";
import type { ListStockParams } from "./Stock.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const stockQueryKeys = {
  all: ["stock"] as const,
  paginated: (params: ListStockParams) =>
    [...stockQueryKeys.all, "paginated", params] as const,
  detail: (id: string) => [...stockQueryKeys.all, "detail", id] as const,
};

export function useStockPaginatedQuery(params: ListStockParams) {
  const { stockApi } = useApi();

  return useQuery({
    queryKey: stockQueryKeys.paginated(params),
    queryFn: () => stockApi.getPaginated(params),
  });
}

export function useStockDetailQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  const { stockApi } = useApi();

  return useQuery({
    queryKey: stockQueryKeys.detail(id ?? ""),
    queryFn: () => stockApi.getById(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

export function useInvalidateStockQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: stockQueryKeys.all });
}
