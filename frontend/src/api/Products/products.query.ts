import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const productsQueryKeys = {
  all: ["products"] as const,
};

export function useProductsQuery() {
  const { productsApi } = useApi();

  return useQuery({
    queryKey: productsQueryKeys.all,
    queryFn: () => productsApi.getAll(),
  });
}

export function useInvalidateProductsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
}
