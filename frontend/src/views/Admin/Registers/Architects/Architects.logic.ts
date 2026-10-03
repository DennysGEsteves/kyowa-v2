import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useUsersQuery } from "@/api/Users/users.query";
import type { Architect } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { buildSellerNameLookup, getArchitectTableColumns } from "./Architects.props";

export function ArchitectsLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingArchitect, setEditingArchitect] = useState<
    Architect | undefined
  >();
  const [deleteArchitect, setDeleteArchitect] = useState<Architect | null>(null);

  const {
    data: architects = [],
    isLoading,
    isError,
    refetch,
  } = useArchitectsQuery();
  const { data: users = [] } = useUsersQuery();

  const getSellerName = useMemo(
    () => buildSellerNameLookup(users),
    [users],
  );

  const openCreate = useCallback(() => {
    setEditingArchitect(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((architect: Architect) => {
    setEditingArchitect(architect);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getArchitectTableColumns(
        openEdit,
        (architect) => setDeleteArchitect(architect),
        getSellerName,
      ),
    [openEdit, getSellerName],
  );

  return {
    data: {
      architects,
      columns,
      formOpen,
      editingArchitect,
      deleteArchitect,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchArchitects: refetch,
      setFormOpen,
      setEditingArchitect,
      setDeleteArchitect,
    },
  };
}
