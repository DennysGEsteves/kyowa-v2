import type { Address } from "./address";

export type Store = {
  id: string;
  name: string;
  email: string | null;
  address: Address | null;
  phone1: string | null;
  phone2: string | null;
  obs: string | null;
  managerId: string | null;
};
