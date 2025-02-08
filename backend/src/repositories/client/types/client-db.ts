import { Architect, Client } from '@prisma/client';

export type ClientDB = Client & {
  architect?: Architect;
};
