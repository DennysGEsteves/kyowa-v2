import { PaginationArgs } from 'src/controllers/pagination-args';

export const paginationDBQueryObj = (paginationArgs: PaginationArgs) => {
  const { page, limit } = paginationArgs;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
};
