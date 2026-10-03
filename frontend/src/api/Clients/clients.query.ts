import { useApi } from "@/api/api.hook";
import type { ListClientsParams } from "./Clients.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const clientsQueryKeys = {
  all: ["clients"] as const,
  paginated: (params: ListClientsParams) =>
    [...clientsQueryKeys.all, "paginated", params] as const,
};

export function useClientsQuery() {
  const { clientsApi } = useApi();

  return useQuery({
    queryKey: [...clientsQueryKeys.all, "list"] as const,
    queryFn: () => clientsApi.getAll(),
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
