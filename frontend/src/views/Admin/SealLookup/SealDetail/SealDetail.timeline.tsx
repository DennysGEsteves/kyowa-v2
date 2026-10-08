import {
  sealStatusBadgeClass,
  sealStatusLabels,
  type SealHistoryViewItem,
} from "@entities";

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

type SealHistoryTimelineProps = {
  items: SealHistoryViewItem[];
};

function formatHistoryDate(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return dateTimeFormatter.format(date);
}

function formatHistoryDetails(data: Record<string, unknown>): string[] {
  const lines: string[] = [];

  const previousNumber = data.previousNumber;
  const number = data.number;
  if (
    typeof previousNumber === "number" &&
    typeof number === "number" &&
    previousNumber !== number
  ) {
    lines.push(`Número alterado de ${previousNumber} para ${number}`);
  }

  const previousStoreId = data.previousStoreId;
  const storeId = data.storeId;
  if (
    typeof previousStoreId === "string" &&
    typeof storeId === "string" &&
    previousStoreId !== storeId
  ) {
    const storeName = data.storeName;
    const label =
      typeof storeName === "string" && storeName.trim()
        ? storeName.trim()
        : "—";
    lines.push(`Loja alterada para ${label}`);
  }

  const previousProductId = data.previousProductId;
  const productId = data.productId;
  if (
    typeof previousProductId === "string" &&
    typeof productId === "string" &&
    previousProductId !== productId
  ) {
    lines.push("Produto alterado");
  }

  return lines;
}

export function SealHistoryTimeline({ items }: SealHistoryTimelineProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-kyowa-muted">Nenhum evento no histórico.</p>
    );
  }

  return (
    <ol className="relative border-l border-kyowa-border pl-5">
      {items.map((item, index) => {
        const details = formatHistoryDetails(item.data);

        return (
          <li key={`${item.createdAt}-${index}`} className="mb-6 last:mb-0">
            <span
              className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-kyowa-border bg-white"
              aria-hidden
            />
            <p className="text-xs text-kyowa-muted">
              {formatHistoryDate(item.createdAt)}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className={sealStatusBadgeClass[item.status]}>
                {sealStatusLabels[item.status]}
              </span>
              <span className="text-sm text-kyowa-ink">{item.userName}</span>
            </div>
            {details.length > 0 ? (
              <ul className="mt-1 space-y-0.5 text-sm text-kyowa-muted">
                {details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
