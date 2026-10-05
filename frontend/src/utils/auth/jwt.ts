import type { UserPermission } from "@entities";
import { userPermissions } from "@entities";

export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const json = atob(segment.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getPermissionFromToken(token: string): UserPermission | null {
  const payload = parseJwtPayload(token);
  if (!payload || typeof payload.permission !== "string") {
    return null;
  }

  const permission = payload.permission as UserPermission;
  return userPermissions.includes(permission) ? permission : null;
}

export function getTokenCookieMaxAgeSeconds(token: string): number {
  const payload = parseJwtPayload(token);
  if (payload?.exp && typeof payload.exp === "number") {
    const seconds = payload.exp - Math.floor(Date.now() / 1000);
    return Math.max(0, seconds);
  }
  return 60 * 60 * 24 * 7;
}
