import { useApi } from "@/api/api.hook";
import type { ListProvidersParams } from "./Providers.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const providersQueryKeys = {
  all: ["providers"] as const,
  paginated: (params: ListProvidersParams) =>
    [...providersQueryKeys.all, "paginated", params] as const,
  searchByName: (name: string, limit: number) =>
    [...providersQueryKeys.all, "search-by-name", name, limit] as const,
};

export function useProvidersQuery() {
  const { providersApi } = useApi();

  return useQuery({
    queryKey: [...providersQueryKeys.all, "list"] as const,
    queryFn: () => providersApi.getAll(),
  });
}

export function useProviderNameSuggestionsQuery(name: string, limit = 10) {
  const { providersApi } = useApi();
  const trimmed = name.trim();

  return useQuery({
    queryKey: providersQueryKeys.searchByName(trimmed, limit),
    queryFn: () => providersApi.searchByName(trimmed, limit),
    enabled: trimmed.length > 0,
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
