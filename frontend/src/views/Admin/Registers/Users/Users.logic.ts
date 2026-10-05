import { useStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { routes } from "@routes";
import type { User } from "@entities";
import { useMemo, useState } from "react";
import { buildStoreNameLookup, getUserTableColumns } from "./Users.props";

export function UsersLogic() {
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { data: users = [], isLoading, isError, refetch } = useUsersQuery();
  const { data: stores = [] } = useStoresQuery();

  const getStoreName = useMemo(() => buildStoreNameLookup(stores), [stores]);

  const columns = useMemo(
    () =>
      getUserTableColumns(
        (user) => routes.users.edit(user.id),
        (user) => setDeleteUser(user),
        getStoreName,
      ),
    [getStoreName],
  );

  return {
    data: {
      users,
      columns,
      deleteUser,
      isLoading,
      isError,
    },
    methods: {
      refetchUsers: refetch,
      setDeleteUser,
    },
  };
}
