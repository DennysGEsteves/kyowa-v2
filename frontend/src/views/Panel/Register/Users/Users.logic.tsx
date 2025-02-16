"use client";

import type { User } from "@/types/user";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import UserResolvers from "./Users.gql";
import { tableColumns } from "./Users.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User | undefined>(undefined);

  const { data } = useQuery(UserResolvers.GET_USERS);

  const tableColumnsData = tableColumns({ setModalUser, setOpenModal });

  return {
    data: {
      users: data?.getUsers || [],
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
