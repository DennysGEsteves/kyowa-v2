export type BudgetStatus = "closed" | "open" | "inactive" | "lost";

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
  userName: string;
  data: Record<string, unknown>;
};

export type Budget = {
  id: string;
  sequentialId: number | null;
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
  closed: "Efetivado",
  open: "Aberto",
  inactive: "Inativo",
  lost: "Perdido",
};

export const budgetStatusBadgeClass: Record<BudgetStatus, string> = {
  open:
    "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-800",
  closed:
    "inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-sm font-semibold text-sky-800",
  inactive:
    "inline-flex rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-sm font-semibold text-zinc-600",
  lost:
    "inline-flex rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm font-semibold text-rose-800",
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
  "inactive",
  "lost",
];

/** Status disponíveis no formulário de orçamento (criar/editar). */
export const budgetUpsertStatuses: BudgetStatus[] = [
  "open",
  "closed",
  "lost",
  "inactive",
];

export type BudgetLostReason =
  | "price"
  | "deadline"
  | "withdrawal"
  | "competitor"
  | "postponed";

export const budgetLostReasonLabels: Record<BudgetLostReason, string> = {
  price: "Preço",
  deadline: "Prazo",
  withdrawal: "Desistência",
  competitor: "Optou por outra empresa",
  postponed: "Adiou a Compra",
};

export const budgetLostReasons: BudgetLostReason[] = [
  "price",
  "deadline",
  "withdrawal",
  "competitor",
  "postponed",
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
