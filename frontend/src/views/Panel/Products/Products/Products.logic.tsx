import { GET_PRODUCTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import type { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tableColumns } from "./Products.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalProduct, setModalProduct] = useState<Product | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let debounce: NodeJS.Timeout | undefined = undefined;

  const { productsRepository } = useRepository();

  const { data } = useQuery({
    queryKey: [GET_PRODUCTS_REFETCH_TAG, { page, search }],
    queryFn: () => productsRepository.getAllByPagination(page, search),
  });

  const tableColumnsData = tableColumns({
    setModalProduct,
    setOpenModal,
  });

  function onPageChange(page: number) {
    setPage(page);
  }

  function onSearch(value: string) {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setPage(1);
      setSearch(value);
    }, 500);
  }

  return {
    data: {
      openModal,
      modalProduct,
      tableData: {
        items: data?.items || [],
        columns: tableColumnsData,
        search: true,
        onSearch,
        pagination: {
          ...data?.meta,
          onPageChange,
        },
      },
    },
    methods: {
      setOpenModal,
      setModalProduct,
    },
  };
};
