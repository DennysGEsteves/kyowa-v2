import { useApi } from "@/api/api.hook";
import { useProductLookupsQuery } from "@/api/ProductLookups/product-lookups.query";
import {
  productsQueryKeys,
  useUpdatePricesProductsQuery,
} from "@/api/Products/products.query";
import { useQueryClient } from "@tanstack/react-query";
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
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmSuccessMessage, setConfirmSuccessMessage] = useState<
    string | null
  >(null);
  const [confirmErrorMessage, setConfirmErrorMessage] = useState<string | null>(
    null,
  );
  const [filtersResetKey, setFiltersResetKey] = useState(0);

  const { productsApi } = useApi();
  const queryClient = useQueryClient();
  const { categories } = useProductLookupsQuery();

  const handleSearch = useCallback((filters: UpdatePricesListFilters) => {
    setAppliedFilters(filters);
    setPage(1);
    setConfirmSuccessMessage(null);
    setConfirmErrorMessage(null);
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

  const canConfirmAdjustment =
    hasSearched &&
    adjustmentPercent > 0 &&
    meta.total > 0 &&
    !isConfirming &&
    !isFetching;

  const handleConfirmAdjustment = useCallback(async () => {
    if (!appliedFilters || adjustmentPercent <= 0 || meta.total === 0) {
      return;
    }

    const productLabel =
      meta.total === 1 ? "1 produto" : `${meta.total} produtos`;

    const confirmed = window.confirm(
      `Confirmar reajuste de ${adjustmentPercent}% no preço de venda de ${productLabel} que correspondem aos filtros da busca?`,
    );
    if (!confirmed) {
      return;
    }

    setConfirmSuccessMessage(null);
    setConfirmErrorMessage(null);
    setIsConfirming(true);

    try {
      const result = await productsApi.applyPriceAdjustment({
        adjustmentPercent,
        name: appliedFilters.name,
        providerName: appliedFilters.providerName,
        categoryId: appliedFilters.categoryId,
      });

      await queryClient.invalidateQueries({
        queryKey: productsQueryKeys.all,
      });

      const updatedLabel =
        result.updatedCount === 1
          ? "1 produto atualizado"
          : `${result.updatedCount} produtos atualizados`;

      setConfirmSuccessMessage(`${updatedLabel} com sucesso.`);
      setAppliedFilters(null);
      setPage(1);
      setAdjustmentPercent(0);
      setFiltersResetKey((key) => key + 1);
    } catch {
      setConfirmErrorMessage(
        "Não foi possível aplicar o reajuste. Tente novamente.",
      );
    } finally {
      setIsConfirming(false);
    }
  }, [
    adjustmentPercent,
    appliedFilters,
    meta.total,
    productsApi,
    queryClient,
  ]);

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
      canConfirmAdjustment,
      isConfirming,
      confirmSuccessMessage,
      confirmErrorMessage,
      filtersResetKey,
    },
    methods: {
      onSearch: handleSearch,
      setPage,
      setAdjustmentPercent,
      onConfirmAdjustment: handleConfirmAdjustment,
    },
  };
}
