import { useProductsPaginatedQuery } from "@/api/Products/products.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Product } from "@entities";
import { useCallback, useMemo, useState } from "react";
import type { ProductsListFilters } from "./components/ProductsFilters";
import { getProductTableColumns } from "./Products.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

const INITIAL_LIST_FILTERS: ProductsListFilters = {
  hasActiveFilters: false,
};

export function ProductsLogic() {
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [listFilters, setListFilters] =
    useState<ProductsListFilters>(INITIAL_LIST_FILTERS);

  const handleListFiltersChange = useCallback((next: ProductsListFilters) => {
    setListFilters(next);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      name: listFilters.name,
    }),
    [page, listFilters],
  );

  const {
    data: paginated,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useProductsPaginatedQuery(queryParams);

  const products = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () =>
      getProductTableColumns(
        (product) => adminRoutes.products.edit(product.id),
        (product) => setDeleteProduct(product),
      ),
    [],
  );

  return {
    data: {
      products,
      columns,
      deleteProduct,
      meta,
      hasActiveFilters: listFilters.hasActiveFilters,
      isLoading,
      isFetching,
      isError,
    },
    methods: {
      refetchProducts: refetch,
      setDeleteProduct,
      onListFiltersChange: handleListFiltersChange,
      setPage,
    },
  };
}
