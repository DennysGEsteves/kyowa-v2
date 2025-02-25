/* eslint-disable react-hooks/exhaustive-deps */
import { useRepository } from "@/repositories/repositories.hook";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GET_USERS_REFETCH_TAG, tableColumns } from "./Users.props";

export const useLogic = () => {
  // const [users, setUsers] = useState<User[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User | undefined>(undefined);

  const { usersRepository } = useRepository();

  const { data: users } = useQuery({
    queryKey: [GET_USERS_REFETCH_TAG],
    queryFn: usersRepository.getAll,
  });

  const tableColumnsData = tableColumns({ setModalUser, setOpenModal });

  return {
    data: {
      users: users || [],
      openModal,
      modalUser,
      tableColumnsData,
    },
    methods: {
      setOpenModal,
      setModalUser,
    },
  };
};
