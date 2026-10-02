export type SessionUser = {
  id: string;
  email: string;
  name: string;
  permission: string;
  storeId: number;
  active: boolean;
};

const STORAGE_KEY = "kyowa_session";

export function getClientSession(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function setClientSession(user: SessionUser): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearClientSession(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
