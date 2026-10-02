import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const storesQueryKeys = {
  all: ["stores"] as const,
};

export function useStoresQuery() {
  const { storesApi } = useApi();

  return useQuery({
    queryKey: storesQueryKeys.all,
    queryFn: () => storesApi.getAll(),
  });
}

export function useInvalidateStoresQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: storesQueryKeys.all });
}
