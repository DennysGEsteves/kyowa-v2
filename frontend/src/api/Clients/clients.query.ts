import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const clientsQueryKeys = {
  all: ["clients"] as const,
};

export function useClientsQuery() {
  const { clientsApi } = useApi();

  return useQuery({
    queryKey: clientsQueryKeys.all,
    queryFn: () => clientsApi.getAll(),
  });
}

export function useInvalidateClientsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: clientsQueryKeys.all });
}
