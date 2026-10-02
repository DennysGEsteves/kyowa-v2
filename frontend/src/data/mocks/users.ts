import type { User } from "@/lib/types/user";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@kyowa.com.br",
    name: "Ana Silva",
    phone: "(11) 98765-4321",
    login: "ana.silva",
    permission: "admin",
    storeId: "000000000000000000000001",
    active: true,
  },
  {
    id: "2",
    email: "gerente@kyowa.com.br",
    name: "Carlos Mendes",
    phone: "(11) 91234-5678",
    login: "carlos.mendes",
    permission: "manager",
    storeId: "000000000000000000000001",
    active: true,
  },
  {
    id: "3",
    email: "vendas@kyowa.com.br",
    name: "Juliana Costa",
    phone: null,
    login: "juliana.costa",
    permission: "sales",
    storeId: "000000000000000000000002",
    active: true,
  },
  {
    id: "4",
    email: "financeiro@kyowa.com.br",
    name: "Roberto Lima",
    phone: "(11) 99876-5432",
    login: null,
    permission: "finance",
    storeId: "000000000000000000000001",
    active: false,
  },
];
