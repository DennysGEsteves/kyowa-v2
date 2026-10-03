import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import { adminRoutes } from "@/routes/adminRoutes";
import type { Client } from "@entities";
import { useMemo, useState } from "react";
import { buildArchitectNameLookup, getClientTableColumns } from "./Clients.props";

export function ClientsLogic() {
  const [deleteClient, setDeleteClient] = useState<Client | null>(null);

  const {
    data: clients = [],
    isLoading,
    isError,
    refetch,
  } = useClientsQuery();
  const { data: architects = [] } = useArchitectsQuery();

  const getArchitectName = useMemo(
    () => buildArchitectNameLookup(architects),
    [architects],
  );

  const columns = useMemo(
    () =>
      getClientTableColumns(
        (client) => adminRoutes.clients.edit(client.id),
        (client) => setDeleteClient(client),
        getArchitectName,
      ),
    [getArchitectName],
  );

  return {
    data: {
      clients,
      columns,
      deleteClient,
      isLoading,
      isError,
    },
    methods: {
      refetchClients: refetch,
      setDeleteClient,
    },
  };
}
