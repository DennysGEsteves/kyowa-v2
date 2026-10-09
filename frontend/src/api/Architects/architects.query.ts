import { useApi } from "@/api/api.hook";
import type { ListArchitectsParams } from "./Architects.dto";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type ArchitectNameSuggestion = {
  id: string;
  name: string;
};

export const architectsQueryKeys = {
  all: ["architects"] as const,
  paginated: (params: ListArchitectsParams) =>
    [...architectsQueryKeys.all, "paginated", params] as const,
  nameSuggestions: (name: string, limit: number) =>
    [...architectsQueryKeys.all, "name-suggestions", name, limit] as const,
};

export function useArchitectsQuery() {
  const { architectsApi } = useApi();

  return useQuery({
    queryKey: [...architectsQueryKeys.all, "list"] as const,
    queryFn: () => architectsApi.getAll(),
  });
}

export function useArchitectNameSuggestionsQuery(name: string, limit = 10) {
  const { architectsApi } = useApi();
  const trimmed = name.trim();

  return useQuery({
    queryKey: architectsQueryKeys.nameSuggestions(trimmed, limit),
    queryFn: async (): Promise<ArchitectNameSuggestion[]> => {
      const result = await architectsApi.getPaginated({
        page: 1,
        limit,
        name: trimmed,
        active: true,
      });
      return result.data.map((architect) => ({
        id: architect.id,
        name: architect.name,
      }));
    },
    enabled: trimmed.length > 0,
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
