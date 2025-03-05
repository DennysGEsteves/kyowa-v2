import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import type { Architect } from "@/types/architect";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GET_ARCHITECTS_REFETCH_TAG, tableColumns } from "./Architects.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalArchitect, setModalArchitect] = useState<Architect | undefined>(
    undefined,
  );

  const { architectsRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data: architects } = useQuery({
    queryKey: [GET_ARCHITECTS_REFETCH_TAG],
    queryFn: architectsRepository.getAll,
  });

  const tableColumnsData = tableColumns({
    setModalArchitect,
    setOpenModal,
    managers,
  });

  return {
    data: {
      architects: architects || [],
      openModal,
      modalArchitect,
      tableColumnsData,
    },
    methods: {
      setOpenModal,
      setModalArchitect,
    },
  };
};
