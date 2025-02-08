import { Store, User } from '@prisma/client';

export type StoreDB = Store & {
  manager?: User;
};
