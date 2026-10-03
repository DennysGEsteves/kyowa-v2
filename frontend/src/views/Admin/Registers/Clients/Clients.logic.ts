import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import type { Client } from "@entities";
import { useCallback, useMemo, useState } from "react";
import { buildArchitectNameLookup, getClientTableColumns } from "./Clients.props";

export function ClientsLogic() {
  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>();
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

  const openCreate = useCallback(() => {
    setEditingClient(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  }, []);

  const columns = useMemo(
    () =>
      getClientTableColumns(
        openEdit,
        (client) => setDeleteClient(client),
        getArchitectName,
      ),
    [openEdit, getArchitectName],
  );

  return {
    data: {
      clients,
      columns,
      formOpen,
      editingClient,
      deleteClient,
      isLoading,
      isError,
    },
    methods: {
      openCreate,
      openEdit,
      refetchClients: refetch,
      setFormOpen,
      setEditingClient,
      setDeleteClient,
    },
  };
}
