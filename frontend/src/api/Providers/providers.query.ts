import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const providersQueryKeys = {
  all: ["providers"] as const,
};

export function useProvidersQuery() {
  const { providersApi } = useApi();

  return useQuery({
    queryKey: providersQueryKeys.all,
    queryFn: () => providersApi.getAll(),
  });
}

export function useInvalidateProvidersQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: providersQueryKeys.all });
}
