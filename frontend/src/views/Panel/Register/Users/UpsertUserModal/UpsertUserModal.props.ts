import type { Role } from "@/types";
import { RoleTranslated } from "@/types";

export const roleOptions = Object.keys(RoleTranslated).map((role) => ({
  value: role,
  label: RoleTranslated[role as Role],
}));
