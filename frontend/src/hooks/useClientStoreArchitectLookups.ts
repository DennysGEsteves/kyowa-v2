import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import { useStoresQuery } from "@/api/Stores/stores.query";
import type { Architect, Client, Store } from "@entities";
import { useMemo } from "react";

export type ClientStoreArchitectLookups = {
  getClientName: (id: string | null | undefined) => string;
  getStoreName: (id: string | undefined) => string;
  getArchitectName: (id: string | null | undefined) => string;
};

function buildLookups(
  clients: Client[],
  stores: Store[],
  architects: Architect[],
): ClientStoreArchitectLookups {
  const clientById = new Map(clients.map((client) => [client.id, client]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const architectById = new Map(
    architects.map((architect) => [architect.id, architect]),
  );

  return {
    getClientName: (id) =>
      id ? (clientById.get(id)?.name ?? "—") : "—",
    getStoreName: (id) => (id ? (storeById.get(id)?.name ?? "—") : "—"),
    getArchitectName: (id) =>
      id ? (architectById.get(id)?.name ?? "—") : "—",
  };
}

export function useClientStoreArchitectLookups() {
  const { data: clients = [], isLoading: isClientsLoading } = useClientsQuery();
  const { data: stores = [], isLoading: isStoresLoading } = useStoresQuery();
  const { data: architects = [], isLoading: isArchitectsLoading } =
    useArchitectsQuery();

  const lookups = useMemo(
    () => buildLookups(clients, stores, architects),
    [clients, stores, architects],
  );

  const isLoading =
    isClientsLoading || isStoresLoading || isArchitectsLoading;

  return { clients, stores, architects, lookups, isLoading };
}
