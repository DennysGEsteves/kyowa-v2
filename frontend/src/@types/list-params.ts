export type ListPaginationParams = {
  page?: number;
  limit?: number;
};

export type ListNameParams = ListPaginationParams & {
  name?: string;
};

export type ListNameActiveParams = ListPaginationParams & {
  name?: string;
  active?: boolean;
};
