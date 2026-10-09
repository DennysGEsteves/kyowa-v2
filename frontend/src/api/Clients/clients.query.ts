import { useApi } from "@/api/api.hook";
import type { ListClientsParams } from "./Clients.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type ClientNameSuggestion = {
  id: string;
  name: string;
};

export const clientsQueryKeys = {
  all: ["clients"] as const,
  paginated: (params: ListClientsParams) =>
    [...clientsQueryKeys.all, "paginated", params] as const,
  nameSuggestions: (name: string, limit: number) =>
    [...clientsQueryKeys.all, "name-suggestions", name, limit] as const,
};

export function useClientsQuery() {
  const { clientsApi } = useApi();

  return useQuery({
    queryKey: [...clientsQueryKeys.all, "list"] as const,
    queryFn: () => clientsApi.getAll(),
  });
}

export function useClientNameSuggestionsQuery(name: string, limit = 10) {
  const { clientsApi } = useApi();
  const trimmed = name.trim();

  return useQuery({
    queryKey: clientsQueryKeys.nameSuggestions(trimmed, limit),
    queryFn: async (): Promise<ClientNameSuggestion[]> => {
      const result = await clientsApi.getPaginated({
        page: 1,
        limit,
        name: trimmed,
        active: true,
      });
      return result.data.map((client) => ({
        id: client.id,
        name: client.name,
      }));
    },
    enabled: trimmed.length > 0,
  });
}

export function useClientsPaginatedQuery(params: ListClientsParams) {
  const { clientsApi } = useApi();

  return useQuery({
    queryKey: clientsQueryKeys.paginated(params),
    queryFn: () => clientsApi.getPaginated(params),
  });
}

export function useInvalidateClientsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: clientsQueryKeys.all });
}
