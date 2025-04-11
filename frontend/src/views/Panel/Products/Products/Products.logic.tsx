import type { Product } from "@/@types/product";
import { GET_PRODUCTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tableColumns } from "./Products.props";

export const useLogic = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const router = useRouter();
  let debounce: NodeJS.Timeout | undefined = undefined;

  const { productsRepository } = useRepository();

  const { data } = useQuery({
    queryKey: [GET_PRODUCTS_REFETCH_TAG, { page, search }],
    queryFn: () => productsRepository.getAllByPagination(page, search),
  });

  console.log(data);

  const goToUpsert = (product?: Product) => {
    router.push(`/produtos/produtos/${product?.id ?? "novo"}`);
  };

  const tableColumnsData = tableColumns({
    goToUpsert,
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
      goToUpsert,
    },
  };
};
