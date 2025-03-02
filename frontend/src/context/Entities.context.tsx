"use client";

import type { Store } from "@/types";
import type { User } from "@/types/user";
import { createContext, useContext, type ReactNode } from "react";

export type EntitiesContextType = {
  stores: Store[];
  managers: User[];
};

const EntitiesContext = createContext<EntitiesContextType>({
  stores: [],
  managers: [],
});

export const EntitiesProvider = ({
  children,
  entities,
}: {
  children: ReactNode;
  entities: EntitiesContextType;
}) => {
  return (
    <EntitiesContext.Provider value={entities}>
      {children}
    </EntitiesContext.Provider>
  );
};

export const useEntitiesContext = () => {
  const context = useContext(EntitiesContext);
  return context;
};
