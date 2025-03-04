import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import type { Store } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GET_USERS_REFETCH_TAG, tableColumns } from "./Stores.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalStore, setModalStore] = useState<Store | undefined>(undefined);

  const { storesRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data: stores } = useQuery({
    queryKey: [GET_USERS_REFETCH_TAG],
    queryFn: storesRepository.getAll,
  });

  const tableColumnsData = tableColumns({
    setModalStore,
    setOpenModal,
    managers,
  });

  return {
    data: {
      stores: stores || [],
      openModal,
      modalStore,
      tableColumnsData,
    },
    methods: {
      setOpenModal,
      setModalStore,
    },
  };
};
