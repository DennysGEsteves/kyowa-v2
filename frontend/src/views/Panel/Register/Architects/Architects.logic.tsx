import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import type { Architect } from "@/types/architect";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  GET_ARCHITECTS_PAGE_REFETCH_TAG,
  tableColumns,
} from "./Architects.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalArchitect, setModalArchitect] = useState<Architect | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);

  const { architectsRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data } = useQuery({
    queryKey: [GET_ARCHITECTS_PAGE_REFETCH_TAG + page],
    queryFn: () => architectsRepository.getAllByPagination(page),
  });

  const tableColumnsData = tableColumns({
    setModalArchitect,
    setOpenModal,
    managers,
  });

  function onPageChange(page: number) {
    setPage(page);
  }

  return {
    data: {
      openModal,
      modalArchitect,
      tableData: {
        items: data?.items || [],
        columns: tableColumnsData,
        search: true,
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
