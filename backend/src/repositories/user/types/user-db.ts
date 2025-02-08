import { Architect, Store, User } from '@prisma/client';

export type UserDB = User & {
  architects?: Architect[];
  managerStores?: Store[];
};
