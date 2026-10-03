import { useProductsQuery } from "@/api/Products/products.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Product } from "@entities";
import { useMemo, useState } from "react";
import { getProductTableColumns } from "./Products.props";

export function ProductsLogic() {
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProductsQuery();

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
      isLoading,
      isError,
    },
    methods: {
      refetchProducts: refetch,
      setDeleteProduct,
    },
  };
}
