import { ClientDB } from '../types';

export type IClientPagination = {
  items: ClientDB[];
  total: number;
};
