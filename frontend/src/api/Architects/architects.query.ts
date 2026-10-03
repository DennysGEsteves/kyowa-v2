import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const architectsQueryKeys = {
  all: ["architects"] as const,
};

export function useArchitectsQuery() {
  const { architectsApi } = useApi();

  return useQuery({
    queryKey: architectsQueryKeys.all,
    queryFn: () => architectsApi.getAll(),
  });
}

export function useInvalidateArchitectsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: architectsQueryKeys.all });
}
