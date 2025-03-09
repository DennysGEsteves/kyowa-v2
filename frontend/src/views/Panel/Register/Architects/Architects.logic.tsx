import { useEntitiesContext } from "@/context/Entities.context";
import { GET_ARCHITECTS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import type { Architect } from "@/types/architect";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { tableColumns } from "./Architects.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalArchitect, setModalArchitect] = useState<Architect | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  let debounce: NodeJS.Timeout | undefined = undefined;

  const { architectsRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data } = useQuery({
    queryKey: [GET_ARCHITECTS_REFETCH_TAG, { page, search }],
    queryFn: () => architectsRepository.getAllByPagination(page, search),
  });

  const tableColumnsData = tableColumns({
    setModalArchitect,
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
      modalArchitect,
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
      setModalArchitect,
    },
  };
};
