import {
  budgetClosingAtLabels,
  BudgetClosingLevel,
  budgetClosingLevelLabels,
  budgetStatusLabels,
  type BudgetClosingAt,
  type BudgetHistoryItem,
  type BudgetStatus,
} from "@entities";
import { formatDateTimeShort } from "@/utils/date";
import { ClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { formatCurrencyBRLFromNumber } from "@/utils/masks";

type BudgetHistoryTimelineProps = {
  items: BudgetHistoryItem[];
  lookups: ClientStoreArchitectLookups;
};

function isBudgetStatus(value: unknown): value is BudgetStatus {
  return typeof value === "string" && value in budgetStatusLabels;
}

function isClosingAt(value: unknown): value is BudgetClosingAt {
  return typeof value === "string" && value in budgetClosingAtLabels;
}

function isClosingLevel(value: unknown): value is BudgetClosingLevel {
  return typeof value === "string" && value in budgetClosingLevelLabels;
}

function formatStatus(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (isBudgetStatus(value)) {
    return budgetStatusLabels[value];
  }
  return String(value);
}

function formatClosingAt(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (isClosingAt(value)) {
    return budgetClosingAtLabels[value];
  }
  return String(value);
}

function formatClosingLevel(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (isClosingLevel(value)) {
    return budgetClosingLevelLabels[value];
  }
  return String(value);
}

function formatMoney(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }
  if (typeof value === "number") {
    return formatCurrencyBRLFromNumber(value);
  }
  return String(value);
}

function formatText(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  return String(value);
}

export function formatBudgetHistoryDetails(
  data: Record<string, unknown>,
  lookups: ClientStoreArchitectLookups,
): string[] {
  if (data.event === "created") {
    return ["Orçamento criado"];
  }

  const lines: string[] = [];

  if ("clientId" in data || "previousClientId" in data) {
    const previous = data.previousClientId as string | null | undefined;
    const next = data.clientId as string | null | undefined;
    if (previous !== next) {
      lines.push(`Cliente alterado para ${lookups.getClientName(next)}`);
    }
  }

  if ("storeId" in data || "previousStoreId" in data) {
    const previous = data.previousStoreId as string | undefined;
    const next = data.storeId as string | undefined;
    if (previous !== next && next) {
      lines.push(`Loja alterada para ${lookups.getStoreName(next)}`);
    }
  }

  if ("architectId" in data || "previousArchitectId" in data) {
    const previous = data.previousArchitectId as string | null | undefined;
    const next = data.architectId as string | null | undefined;
    if (previous !== next) {
      lines.push(`Arquiteto alterado para ${lookups.getArchitectName(next)}`);
    }
  }

  if ("status" in data || "previousStatus" in data) {
    const previous = data.previousStatus;
    const next = data.status;
    if (previous !== next) {
      lines.push(
        `Status alterado de ${formatStatus(previous)} para ${formatStatus(next)}`,
      );
    }
  }

  if ("closingAt" in data || "previousClosingAt" in data) {
    const previous = data.previousClosingAt;
    const next = data.closingAt;
    if (previous !== next) {
      lines.push(
        `Prazo de fechamento alterado de ${formatClosingAt(previous)} para ${formatClosingAt(next)}`,
      );
    }
  }

  if ("closingLevel" in data || "previousClosingLevel" in data) {
    const previous = data.previousClosingLevel;
    const next = data.closingLevel;
    if (previous !== next) {
      lines.push(
        `Probabilidade de Fechamento alterado de ${formatClosingLevel(previous)} para ${formatClosingLevel(next)}`,
      );
    }
  }

  if ("total" in data || "previousTotal" in data) {
    const previous = data.previousTotal;
    const next = data.total;
    if (previous !== next) {
      lines.push(
        `Total alterado de ${formatMoney(previous)} para ${formatMoney(next)}`,
      );
    }
  }

  if ("obs" in data || "previousObs" in data) {
    const previous = data.previousObs;
    const next = data.obs;
    if (previous !== next) {
      lines.push(
        `Observações alteradas de "${formatText(previous)}" para "${formatText(next)}"`,
      );
    }
  }

  if ("lostReasons" in data || "previousLostReasons" in data) {
    const previous = data.previousLostReasons;
    const next = data.lostReasons;
    if (previous !== next) {
      lines.push(
        `Motivo da perda alterado de "${formatText(previous)}" para "${formatText(next)}"`,
      );
    }
  }

  if ("checkout" in data || "previousCheckout" in data) {
    const previous = JSON.stringify(data.previousCheckout ?? null);
    const next = JSON.stringify(data.checkout ?? null);
    if (previous !== next) {
      const itemCount = Array.isArray(data.checkout) ? data.checkout.length : 0;
      lines.push(`Itens do checkout atualizados (${itemCount} item(ns))`);
    }
  }

  return lines;
}

export function BudgetHistoryTimeline({
  items,
  lookups,
}: BudgetHistoryTimelineProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-kyowa-muted">Nenhum evento no histórico.</p>
    );
  }

  return (
    <ol className="relative border-l border-kyowa-border pl-5">
      {items.map((item, index) => {
        const details = formatBudgetHistoryDetails(item.data, lookups);

        return (
          <li key={`${item.createdAt}-${index}`} className="mb-6 last:mb-0">
            <span
              className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-kyowa-border bg-kyowa-maroon"
              aria-hidden
            />
            <p className="text-xs text-kyowa-muted">
              {formatDateTimeShort(item.createdAt)}
            </p>
            <p className="mt-1 text-sm font-medium text-kyowa-ink">
              {item.userName}
            </p>
            {details.length > 0 ? (
              <ul className="mt-1 space-y-0.5 text-sm text-kyowa-muted">
                {details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-kyowa-muted">
                Alteração registrada
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
