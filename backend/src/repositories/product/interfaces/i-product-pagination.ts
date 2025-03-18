import { ProductDB } from '../types';

export type IProductPagination = {
  items: ProductDB[];
  total: number;
};
