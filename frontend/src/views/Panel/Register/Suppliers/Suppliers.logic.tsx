import type { Supplier } from "@/@types";
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_SUPPLIERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { tableColumns } from "./Suppliers.props";

export const useLogic = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const router = useRouter();

  let debounce: NodeJS.Timeout | undefined = undefined;

  const { suppliersRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data } = useQuery({
    queryKey: [GET_SUPPLIERS_REFETCH_TAG, { page, search }],
    queryFn: () => suppliersRepository.getAllByPagination(page, search),
  });

  const goToUpsert = (supplier?: Supplier) => {
    router.push(`/cadastros/fornecedores/${supplier?.id ?? "novo"}`);
  };

  const tableColumnsData = tableColumns({
    managers,
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
