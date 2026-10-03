import { useApi } from "@/api/api.hook";
import type { ListArchitectsParams } from "./Architects.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const architectsQueryKeys = {
  all: ["architects"] as const,
  paginated: (params: ListArchitectsParams) =>
    [...architectsQueryKeys.all, "paginated", params] as const,
};

export function useArchitectsQuery() {
  const { architectsApi } = useApi();

  return useQuery({
    queryKey: [...architectsQueryKeys.all, "list"] as const,
    queryFn: () => architectsApi.getAll(),
  });
}

export function useArchitectsPaginatedQuery(params: ListArchitectsParams) {
  const { architectsApi } = useApi();

  return useQuery({
    queryKey: architectsQueryKeys.paginated(params),
    queryFn: () => architectsApi.getPaginated(params),
  });
}

export function useInvalidateArchitectsQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: architectsQueryKeys.all });
}
