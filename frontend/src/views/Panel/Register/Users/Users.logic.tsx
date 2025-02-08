/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// import { useQuery } from "@tanstack/react-query";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_USERS = gql`
  query {
    users {
      name
      email
      phone
      storeId
      role
      active
      status
    }
  }
`;

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  // const { usersRepository } = useRepository();

  // const { data: users } = useQuery({
  //   queryKey: [GET_USERS_REVALIDATE_TAG],
  //   queryFn: usersRepository.getUsers,
  // });

  const { data } = useQuery(GET_USERS);

  console.log(data);

  return {
    data: {
      users: data?.users || [],
      openModal,
    },
    methods: {
      setOpenModal,
    },
  };
};
