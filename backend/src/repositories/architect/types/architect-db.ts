import { Client, Architect, User } from '@prisma/client';

export type ArchitectDB = Architect & {
  seller?: User;
  clients?: Client[];
};
