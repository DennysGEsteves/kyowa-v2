import type { User } from "@entities";
import type { ClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";

export type SalesTableLookups = ClientStoreArchitectLookups & {
  getSellerName: (id: string | undefined) => string;
};

export function buildSalesLookups(
  base: ClientStoreArchitectLookups,
  users: User[],
): SalesTableLookups {
  const sellerById = new Map(users.map((user) => [user.id, user.name]));

  return {
    ...base,
    getSellerName: (id) => (id ? (sellerById.get(id) ?? "—") : "—"),
  };
}
