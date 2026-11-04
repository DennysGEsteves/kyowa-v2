import type { User } from "@entities";
import type { ClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";

export type ConsignmentTableLookups = ClientStoreArchitectLookups & {
  getSellerName: (id: string | undefined) => string;
};

export function buildConsignmentLookups(
  base: ClientStoreArchitectLookups,
  users: User[],
): ConsignmentTableLookups {
  const sellerById = new Map(users.map((user) => [user.id, user.name]));

  return {
    ...base,
    getSellerName: (id) => (id ? (sellerById.get(id) ?? "—") : "—"),
  };
}
