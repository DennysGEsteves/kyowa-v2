import { useEntitiesContext } from "@/context/Entities.context";
import { GET_CLIENTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import type { Client } from "@/types/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tableColumns } from "./Clients.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalClient, setModalClient] = useState<Client | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let debounce: NodeJS.Timeout | undefined = undefined;

  const { clientsRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data } = useQuery({
    queryKey: [GET_CLIENTS_REFETCH_TAG, { page, search }],
    queryFn: () => clientsRepository.getAllByPagination(page, search),
  });

  const tableColumnsData = tableColumns({
    setModalClient,
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
      modalClient,
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
      setModalClient,
    },
  };
};
