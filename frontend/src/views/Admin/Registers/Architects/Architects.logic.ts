import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Architect } from "@entities";
import { useMemo, useState } from "react";
import { buildSellerNameLookup, getArchitectTableColumns } from "./Architects.props";

export function ArchitectsLogic() {
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

  const columns = useMemo(
    () =>
      getArchitectTableColumns(
        (architect) => adminRoutes.architects.edit(architect.id),
        (architect) => setDeleteArchitect(architect),
        getSellerName,
      ),
    [getSellerName],
  );

  return {
    data: {
      architects,
      columns,
      deleteArchitect,
      isLoading,
      isError,
    },
    methods: {
      refetchArchitects: refetch,
      setDeleteArchitect,
    },
  };
}
