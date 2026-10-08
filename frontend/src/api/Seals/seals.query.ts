import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const sealsQueryKeys = {
  all: ["seals"] as const,
  search: (number: number) => [...sealsQueryKeys.all, "search", number] as const,
  detail: (id: string) => [...sealsQueryKeys.all, "detail", id] as const,
};

export function useSealsSearchQuery(
  number: number | null,
  options?: { enabled?: boolean },
) {
  const { sealsApi } = useApi();

  return useQuery({
    queryKey: sealsQueryKeys.search(number ?? 0),
    queryFn: () => sealsApi.searchByNumber(number!),
    enabled: Boolean(number) && (options?.enabled ?? true),
  });
}

export function useSealDetailQuery(
  id: string | null,
  options?: { enabled?: boolean },
) {
  const { sealsApi } = useApi();

  return useQuery({
    queryKey: sealsQueryKeys.detail(id ?? ""),
    queryFn: () => sealsApi.getById(id!),
    enabled: Boolean(id) && (options?.enabled ?? true),
  });
}

export function useInvalidateSealsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: sealsQueryKeys.all });
}
