import { useApi } from "@/api/api.hook";
import type { ProductLookupSlug } from "./product-lookups.config";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";

export const productLookupsQueryKeys = {
  all: ["product-lookups"] as const,
  bySlug: (slug: ProductLookupSlug) =>
    [...productLookupsQueryKeys.all, slug] as const,
};

export function useProductLookupQuery(slug: ProductLookupSlug) {
  const { productLookupsApi } = useApi();

  return useQuery({
    queryKey: productLookupsQueryKeys.bySlug(slug),
    queryFn: () => productLookupsApi.getAll(slug),
  });
}

export function useInvalidateProductLookupQuery(slug: ProductLookupSlug) {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: productLookupsQueryKeys.bySlug(slug),
    });
}

export function useProductLookupsQuery() {
  const { productLookupsApi } = useApi();

  const results = useQueries({
    queries: [
      {
        queryKey: productLookupsQueryKeys.bySlug("categories"),
        queryFn: () => productLookupsApi.getCategories(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("colors"),
        queryFn: () => productLookupsApi.getColors(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("designs"),
        queryFn: () => productLookupsApi.getDesigns(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("heights"),
        queryFn: () => productLookupsApi.getHeights(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("models"),
        queryFn: () => productLookupsApi.getModels(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("origins"),
        queryFn: () => productLookupsApi.getOrigins(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("shapes"),
        queryFn: () => productLookupsApi.getShapes(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("sizes"),
        queryFn: () => productLookupsApi.getSizes(),
      },
      {
        queryKey: productLookupsQueryKeys.bySlug("units"),
        queryFn: () => productLookupsApi.getUnits(),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);

  return {
    isLoading,
    categories: results[0].data ?? [],
    colors: results[1].data ?? [],
    designs: results[2].data ?? [],
    heights: results[3].data ?? [],
    models: results[4].data ?? [],
    origins: results[5].data ?? [],
    shapes: results[6].data ?? [],
    sizes: results[7].data ?? [],
    units: results[8].data ?? [],
  };
}
