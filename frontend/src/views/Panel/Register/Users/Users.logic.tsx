import { useEntitiesContext } from "@/context/Entities.context";
import { GET_USERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { searchKeys, tableColumns } from "./Users.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User | undefined>(undefined);

  const { stores } = useEntitiesContext();
  const { usersRepository } = useRepository();

  const { data: users } = useQuery({
    queryKey: [GET_USERS_REFETCH_TAG],
    queryFn: usersRepository.getAll,
  });

  const tableColumnsData = tableColumns({ setModalUser, setOpenModal, stores });

  return {
    data: {
      openModal,
      modalUser,
      tableData: {
        items: users || [],
        columns: tableColumnsData,
        search: true,
        searchKeys: searchKeys,
      },
    },
    methods: {
      setOpenModal,
      setModalUser,
    },
  };
};
