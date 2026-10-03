import { useProductsQuery } from "@/api/Products/products.query";
import type { Product } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { getProductTableColumns } from "./Products.props";

export function ProductsLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useProductsQuery();

  const openCreate = useCallback(() => {
    setEditingProduct(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getProductTableColumns(openEdit, (product) => setDeleteProduct(product)),
    [openEdit],
  );

  return {
    data: {
      products,
      columns,
      formOpen,
      editingProduct,
      deleteProduct,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchProducts: refetch,
      setFormOpen,
      setEditingProduct,
      setDeleteProduct,
    },
  };
}
