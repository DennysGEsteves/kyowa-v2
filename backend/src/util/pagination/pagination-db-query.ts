import { PaginationArgs } from 'src/util/pagination/pagination-args';

export type PaginationSearchType = {
  [key: string]: {
    contains: string;
  };
};

export const paginationDBQueryObj = (
  paginationArgs: PaginationArgs,
  serchKeys?: string[],
) => {
  const { page, limit } = paginationArgs;
  const skip = (page - 1) * limit;
  let search: PaginationSearchType[] = undefined;

  if (paginationArgs.search && serchKeys.length) {
    search = serchKeys.map((key) => ({
      [key]: {
        contains: paginationArgs.search,
      },
    }));
  }

  return {
    ...(paginationArgs.search
      ? {
          where: {
            OR: search,
          },
        }
      : {}),
    skip,
    take: limit,
  };
};
