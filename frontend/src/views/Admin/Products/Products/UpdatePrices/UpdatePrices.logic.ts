import { useProductLookupsQuery } from "@/api/ProductLookups/product-lookups.query";
import { useUpdatePricesProductsQuery } from "@/api/Products/products.query";
import { useCallback, useMemo, useState } from "react";
import type { UpdatePricesListFilters } from "./components/UpdatePricesFilters";
import { getUpdatePricesTableColumns } from "./UpdatePrices.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

export function UpdatePricesLogic() {
  const [page, setPage] = useState(1);
  const [appliedFilters, setAppliedFilters] =
    useState<UpdatePricesListFilters | null>(null);
  const [adjustmentPercent, setAdjustmentPercent] = useState(0);

  const { categories } = useProductLookupsQuery();

  const handleSearch = useCallback((filters: UpdatePricesListFilters) => {
    setAppliedFilters(filters);
    setPage(1);
  }, []);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
      name: appliedFilters?.name,
      providerName: appliedFilters?.providerName,
      categoryId: appliedFilters?.categoryId,
    }),
    [page, appliedFilters],
  );

  const hasSearched = appliedFilters !== null;

  const {
    data: paginated,
    isLoading,
    isFetching,
    isError,
  } = useUpdatePricesProductsQuery(queryParams, { enabled: hasSearched });

  const products = hasSearched ? (paginated?.data ?? []) : [];
  const meta = paginated?.meta ?? EMPTY_META;

  const columns = useMemo(
    () => getUpdatePricesTableColumns(adjustmentPercent),
    [adjustmentPercent],
  );

  return {
    data: {
      products,
      columns,
      adjustmentPercent,
      categories,
      meta,
      hasSearched,
      hasActiveFilters: appliedFilters?.hasActiveFilters ?? false,
      isLoading: hasSearched && isLoading,
      isFetching: hasSearched && isFetching,
      isError: hasSearched && isError,
    },
    methods: {
      onSearch: handleSearch,
      setPage,
      setAdjustmentPercent,
    },
  };
}
