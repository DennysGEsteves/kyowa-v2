import { useEntitiesContext } from "@/context/Entities.context";
import { GET_SUPPLIERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import type { Supplier } from "@/@types/supplier";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tableColumns } from "./Suppliers.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalSupplier, setModalSupplier] = useState<Supplier | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let debounce: NodeJS.Timeout | undefined = undefined;

  const { suppliersRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data } = useQuery({
    queryKey: [GET_SUPPLIERS_REFETCH_TAG, { page, search }],
    queryFn: () => suppliersRepository.getAllByPagination(page, search),
  });

  const tableColumnsData = tableColumns({
    setModalSupplier,
    setOpenModal,
    managers,
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
      modalSupplier,
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
      setModalSupplier,
    },
  };
};
