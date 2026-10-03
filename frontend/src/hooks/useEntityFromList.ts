import { useMemo } from "react";

type ListQueryResult<T> = {
  data?: T[];
  isLoading: boolean;
};

export function useEntityFromList<T extends { id: string }>(
  id: string | undefined,
  useListQuery: () => ListQueryResult<T>,
) {
  const { data = [], isLoading } = useListQuery();

  const entity = useMemo(
    () => (id ? data.find((item) => item.id === id) : undefined),
    [data, id],
  );

  const notFound = Boolean(id) && !isLoading && !entity;

  return { entity, isLoading, notFound };
}
