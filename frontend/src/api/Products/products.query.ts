import { useApi } from "@/api/api.hook";
import type {
  ListProductsParams,
  ListUpdatePricesProductsParams,
} from "./Products.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const productsQueryKeys = {
  all: ["products"] as const,
  paginated: (params: ListProductsParams) =>
    [...productsQueryKeys.all, "paginated", params] as const,
  updatePrices: (params: ListUpdatePricesProductsParams) =>
    [...productsQueryKeys.all, "update-prices", params] as const,
  searchByName: (name: string, limit: number) =>
    [...productsQueryKeys.all, "search-by-name", name, limit] as const,
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

export function useProductNameSuggestionsQuery(name: string, limit = 10) {
  const { productsApi } = useApi();
  const trimmed = name.trim();

  return useQuery({
    queryKey: productsQueryKeys.searchByName(trimmed, limit),
    queryFn: () => productsApi.searchByName(trimmed, limit),
    enabled: trimmed.length > 0,
  });
}

export function useUpdatePricesProductsQuery(
  params: ListUpdatePricesProductsParams,
  options?: { enabled?: boolean },
) {
  const { productsApi } = useApi();

  return useQuery({
    queryKey: productsQueryKeys.updatePrices(params),
    queryFn: () => productsApi.getPaginatedForPriceUpdate(params),
    enabled: options?.enabled ?? true,
  });
}

export function useInvalidateProductsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
}
