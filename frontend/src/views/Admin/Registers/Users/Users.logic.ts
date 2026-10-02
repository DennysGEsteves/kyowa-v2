import { useStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import type { User } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { buildStoreNameLookup, getUserTableColumns } from "./Users.props";

export function UsersLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { data: users = [], isLoading, isError, refetch } = useUsersQuery();
  const { data: stores = [] } = useStoresQuery();

  const getStoreName = useMemo(
    () => buildStoreNameLookup(stores),
    [stores],
  );

  const openCreate = useCallback(() => {
    setEditingUser(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getUserTableColumns(
        openEdit,
        (user) => setDeleteUser(user),
        getStoreName,
      ),
    [openEdit, getStoreName],
  );

  return {
    data: {
      users,
      columns,
      formOpen,
      editingUser,
      deleteUser,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchUsers: refetch,
      setFormOpen,
      setEditingUser,
      setDeleteUser,
    },
  };
}
