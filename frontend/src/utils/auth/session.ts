import type { User, UserPermission } from "@/@types/entities";
const SESSION_USER_KEY = "kyowa_session";
const AUTH_TOKEN_KEY = "kyowa_auth_token";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getClientSession(): User | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(SESSION_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function setClientSession(user: User): void {
  window.localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
}

export function clearClientSession(): void {
  window.localStorage.removeItem(SESSION_USER_KEY);
  clearAuthToken();
}

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const segment = token.split(".")[1];
    if (!segment) return null;
    const json = atob(segment.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Usuário derivado do JWT salvo no sessionStorage (após login). */
export function getSessionUser(): User | null {
  const token = getAuthToken();
  if (!token) return null;

  const payload = parseJwtPayload(token);
  if (!payload) return null;

  const id = payload.id ?? payload.userId;
  if (id === undefined || id === null) return null;

  return {
    id: String(id),
    email: typeof payload.email === "string" ? payload.email : "",
    name: typeof payload.name === "string" ? payload.name : "",
    permission:
      typeof payload.permission === "string"
        ? (payload.permission as UserPermission)
        : null,
    storeId: typeof payload.storeId === "string" ? payload.storeId : "",
    active: payload.active !== false,
  };
}
