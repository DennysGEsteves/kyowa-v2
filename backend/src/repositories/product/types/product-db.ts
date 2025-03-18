import { Product, Supplier } from '@prisma/client';

export type ProductDB = Product & {
  supplier?: Supplier;
};
