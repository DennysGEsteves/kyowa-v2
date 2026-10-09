export type BudgetStatus =
  | "closed"
  | "open"
  | "cancel"
  | "inactive"
  | "lost";

export type BudgetClosingAt =
  | "until3days"
  | "from4to7"
  | "from8to10"
  | "from11to15"
  | "from16to30"
  | "none";

export type BudgetClosingLevel = "high" | "normal" | "low";

export type BudgetCheckoutItem = {
  quantity: number;
  categoryId: string;
  price: number;
  description: string;
};

export type BudgetHistoryItem = {
  userId: string;
  createdAt: string;
  data: Record<string, unknown>;
};

export type Budget = {
  id: string;
  clientId: string | null;
  userId: string;
  storeId: string;
  architectId: string | null;
  createdAt: string;
  obs: string | null;
  lostReasons: string | null;
  total: number | null;
  status: BudgetStatus;
  closingAt: BudgetClosingAt | null;
  closingLevel: BudgetClosingLevel | null;
  checkout: BudgetCheckoutItem[];
  history: BudgetHistoryItem[];
};

export const budgetStatusLabels: Record<BudgetStatus, string> = {
  closed: "Fechado",
  open: "Aberto",
  cancel: "Cancelado",
  inactive: "Inativo",
  lost: "Perdido",
};

export const budgetClosingAtLabels: Record<BudgetClosingAt, string> = {
  until3days: "Até 3 dias",
  from4to7: "De 4 a 7 dias",
  from8to10: "De 8 a 10 dias",
  from11to15: "De 11 a 15 dias",
  from16to30: "De 16 a 30 dias",
  none: "Nenhum",
};

export const budgetClosingLevelLabels: Record<BudgetClosingLevel, string> = {
  high: "Alto",
  normal: "Normal",
  low: "Baixo",
};

export const budgetStatuses: BudgetStatus[] = [
  "open",
  "closed",
  "cancel",
  "inactive",
  "lost",
];

export const budgetClosingAtValues: BudgetClosingAt[] = [
  "until3days",
  "from4to7",
  "from8to10",
  "from11to15",
  "from16to30",
  "none",
];

export const budgetClosingLevels: BudgetClosingLevel[] = [
  "high",
  "normal",
  "low",
];
