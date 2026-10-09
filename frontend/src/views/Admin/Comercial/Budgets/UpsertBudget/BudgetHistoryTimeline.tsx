import type { BudgetHistoryItem } from "@entities";
import {
  formatBudgetHistoryDetails,
  type BudgetHistoryLookups,
} from "./budget-history.format";

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export type BudgetHistoryViewItem = BudgetHistoryItem & {
  userName: string;
};

type BudgetHistoryTimelineProps = {
  items: BudgetHistoryViewItem[];
  lookups: BudgetHistoryLookups;
};

function formatHistoryDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return dateTimeFormatter.format(date);
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
              {formatHistoryDate(item.createdAt)}
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
