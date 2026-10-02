"use client";

import {
  clearClientSession,
  getClientSession,
  type SessionUser,
} from "@util/auth/session";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const AuthContext = createContext<SessionUser | null>(null);

export function useAuth() {
  const user = useContext(AuthContext);
  if (!user) {
    throw new Error("useAuth deve ser usado dentro de AdminAuthProvider.");
  }
  return user;
}

type AdminAuthProviderProps = {
  children: ReactNode;
};

export function AdminAuthProvider({ children }: AdminAuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const session = getClientSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setTimeout(() => {
      setUser(session);
    }, 0);
  }, [router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-kyowa-surface text-sm text-kyowa-muted">
        Carregando...
      </div>
    );
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useLogout() {
  const router = useRouter();

  return () => {
    clearClientSession();
    router.push("/login");
  };
}
