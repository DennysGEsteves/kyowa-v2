import { useApi } from "@/api/api.hook";
import type { ListProductsParams } from "./Products.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const productsQueryKeys = {
  all: ["products"] as const,
  paginated: (params: ListProductsParams) =>
    [...productsQueryKeys.all, "paginated", params] as const,
};

export function useProductsQuery() {
  const { productsApi } = useApi();

  return useQuery({
    queryKey: [...productsQueryKeys.all, "list"] as const,
    queryFn: () => productsApi.getAll(),
  });
}

export function useProductsPaginatedQuery(params: ListProductsParams) {
  const { productsApi } = useApi();

  return useQuery({
    queryKey: productsQueryKeys.paginated(params),
    queryFn: () => productsApi.getPaginated(params),
  });
}

export function useInvalidateProductsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
}
