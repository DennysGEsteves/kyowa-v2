import type { User } from "@/@types/user";
import { useEntitiesContext } from "@/context/Entities.context";
import { GET_USERS_REFETCH_TAG } from "@/repositories/api";
import { useRepository } from "@/repositories/repositories.hook";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchKeys, tableColumns } from "./Users.props";

export const useLogic = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalUser, setModalUser] = useState<User | undefined>(undefined);

  const router = useRouter();
  const { stores } = useEntitiesContext();
  const { usersRepository } = useRepository();

  const { data: users } = useQuery({
    queryKey: [GET_USERS_REFETCH_TAG],
    queryFn: usersRepository.getAll,
  });

  const goToUpsert = (user?: User) => {
    router.push(`/cadastros/usuarios/${user?.id ?? "novo"}`);
  };

  const tableColumnsData = tableColumns({ goToUpsert, stores });

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
      goToUpsert,
    },
  };
};
