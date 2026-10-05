import type { User, UserPermission } from "@/@types/entities";
import { AUTH_TOKEN_COOKIE_NAME } from "./auth-token";
import { getTokenCookieMaxAgeSeconds, parseJwtPayload } from "./jwt";

const SESSION_USER_KEY = "kyowa_session";
export const AUTH_TOKEN_STORAGE_KEY = "kyowa_auth_token";

function writeAuthTokenCookie(token: string): void {
  if (typeof document === "undefined") return;

  const maxAge = getTokenCookieMaxAgeSeconds(token);
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

function clearAuthTokenCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_TOKEN_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string): void {
  window.sessionStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  writeAuthTokenCookie(token);
}

export function clearAuthToken(): void {
  window.sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  clearAuthTokenCookie();
}

/** Garante cookie para o middleware quando só há token no sessionStorage. */
export function syncAuthTokenCookieFromSession(): void {
  const token = getAuthToken();
  if (token) {
    writeAuthTokenCookie(token);
  }
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
