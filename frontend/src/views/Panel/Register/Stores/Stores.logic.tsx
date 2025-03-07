import { useEntitiesContext } from "@/context/Entities.context";
import { useRepository } from "@/repositories/repositories.hook";
import type { Store } from "@/types/store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  GET_STORES_REFETCH_TAG,
  searchKeys,
  tableColumns,
} from "./Stores.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalStore, setModalStore] = useState<Store | undefined>(undefined);

  const { storesRepository } = useRepository();

  const { managers } = useEntitiesContext();

  const { data: stores } = useQuery({
    queryKey: [GET_STORES_REFETCH_TAG],
    queryFn: storesRepository.getAll,
  });

  const tableColumnsData = tableColumns({
    setModalStore,
    setOpenModal,
    managers,
  });

  return {
    data: {
      openModal,
      modalStore,
      tableData: {
        items: stores || [],
        columns: tableColumnsData,
        search: true,
        searchKeys: searchKeys,
      },
    },
    methods: {
      setOpenModal,
      setModalStore,
    },
  };
};
