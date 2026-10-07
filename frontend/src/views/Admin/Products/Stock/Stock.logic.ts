import { useProductsQuery } from "@/api/Products/products.query";
import { useStockPaginatedQuery } from "@/api/Stock/stock.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import type { Stock } from "@entities";
import { useMemo, useState } from "react";
import { buildStockLookups, getStockTableColumns } from "./Stock.props";

const PAGE_SIZE = 10;

const EMPTY_META = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 0,
};

export function StockLogic() {
  const [page, setPage] = useState(1);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit: PAGE_SIZE,
    }),
    [page],
  );

  const {
    data: paginated,
    isLoading: isStockLoading,
    isFetching,
    isError: isStockError,
  } = useStockPaginatedQuery(queryParams);

  const { data: products = [], isLoading: isProductsLoading } =
    useProductsQuery();
  const { data: stores = [], isLoading: isStoresLoading } = useStoresQuery();
  const { data: users = [], isLoading: isUsersLoading } = useUsersQuery();

  const stockEntries = paginated?.data ?? [];
  const meta = paginated?.meta ?? EMPTY_META;

  const lookups = useMemo(
    () => buildStockLookups(products, stores, users),
    [products, stores, users],
  );

  const columns = useMemo(
    () => getStockTableColumns(lookups, setSelectedStock),
    [lookups],
  );

  const isLoading =
    isStockLoading || isProductsLoading || isStoresLoading || isUsersLoading;

  const getProductLabel = (productId: string) =>
    lookups.getProductLabel(productId);

  return {
    data: {
      stockEntries,
      columns,
      meta,
      selectedStock,
      getProductLabel,
      isLoading,
      isFetching,
      isError: isStockError,
    },
    methods: {
      setPage,
      setSelectedStock,
    },
  };
}
