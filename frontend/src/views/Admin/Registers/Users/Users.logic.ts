import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@entities/user";
import { getUserTableColumns } from "./Users.props";

export function UsersLogic() {
  const [users, setUsers] = useState<User[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const columns = useMemo(
    () => getUserTableColumns(setEditingUser, setDeleteTarget),
    [setEditingUser, setDeleteTarget],
  );

  const openCreate = useCallback(() => {
    setFormMode("create");
    setEditingUser(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((user: User) => {
    setFormMode("edit");
    setEditingUser(user);
    setFormOpen(true);
  }, []);

  const getUsers = () => {
    //
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    data: {
      users,
      columns,
      formOpen,
      formMode,
      editingUser,
      deleteTarget,
    },
    methods: {
      openCreate,
      openEdit,
      setFormOpen,
      setFormMode,
      setEditingUser,
      setDeleteTarget,
    },
  };
}
