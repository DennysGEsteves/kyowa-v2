import { useApi } from "@/api/api.hook";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const usersQueryKeys = {
  all: ["users"] as const,
};

export function useUsersQuery() {
  const { usersApi } = useApi();

  return useQuery({
    queryKey: usersQueryKeys.all,
    queryFn: () => usersApi.getAll(),
  });
}

export function useInvalidateUsersQuery() {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({ queryKey: usersQueryKeys.all });
}
