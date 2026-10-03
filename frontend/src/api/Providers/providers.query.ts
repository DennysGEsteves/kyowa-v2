import { useApi } from "@/api/api.hook";
import type { ListProvidersParams } from "./Providers.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const providersQueryKeys = {
  all: ["providers"] as const,
  paginated: (params: ListProvidersParams) =>
    [...providersQueryKeys.all, "paginated", params] as const,
};

export function useProvidersQuery() {
  const { providersApi } = useApi();

  return useQuery({
    queryKey: [...providersQueryKeys.all, "list"] as const,
    queryFn: () => providersApi.getAll(),
  });
}

export function useProvidersPaginatedQuery(params: ListProvidersParams) {
  const { providersApi } = useApi();

  return useQuery({
    queryKey: providersQueryKeys.paginated(params),
    queryFn: () => providersApi.getPaginated(params),
  });
}

export function useInvalidateProvidersQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: providersQueryKeys.all });
}
