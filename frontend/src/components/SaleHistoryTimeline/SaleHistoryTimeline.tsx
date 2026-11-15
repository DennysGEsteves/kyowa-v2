import {
  saleTypeLabels,
  type SaleHistoryItem,
  type SaleType,
} from "@entities";
import { formatDateTimeShort } from "@/utils/date";
import type { ClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { buildSaleCheckoutHistoryLines } from "@/utils/saleCheckoutDisplay";
import {
  SALE_HISTORY_EVENT_CLOSED_AS_SALE,
  SALE_HISTORY_EVENT_CREATED,
} from "./saleHistoryConstants";

export type SaleHistoryLookups = ClientStoreArchitectLookups & {
  getSellerName: (id: string | undefined) => string;
  getProductName: (id: string | undefined) => string;
};

type SaleHistoryTimelineProps = {
  items: SaleHistoryItem[];
  lookups: SaleHistoryLookups;
};

function isSaleType(value: unknown): value is SaleType {
  return typeof value === "string" && value in saleTypeLabels;
}

function formatType(value: unknown): string {
  if (!isSaleType(value)) {
    return "—";
  }
  return saleTypeLabels[value];
}

function formatText(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  return String(value);
}

export function formatSaleHistoryDetails(
  data: Record<string, unknown>,
  lookups: SaleHistoryLookups,
): string[] {
  if (data.event === SALE_HISTORY_EVENT_CREATED) {
    const typeLabel = formatType(data.type);
    return [
      typeLabel === "Consignação"
        ? "Consignação criada"
        : typeLabel === "Venda"
          ? "Venda criada"
          : "Registro criado",
    ];
  }

  if (data.event === SALE_HISTORY_EVENT_CLOSED_AS_SALE) {
    return ["Consignação convertida em venda"];
  }

  const lines: string[] = [];

  if ("clientId" in data || "previousClientId" in data) {
    const previous = data.previousClientId as string | undefined;
    const next = data.clientId as string | undefined;
    if (previous !== next && next) {
      lines.push(`Cliente alterado para ${lookups.getClientName(next)}`);
    }
  }

  if ("sellerId" in data || "previousSellerId" in data) {
    const previous = data.previousSellerId as string | undefined;
    const next = data.sellerId as string | undefined;
    if (previous !== next && next) {
      lines.push(`Vendedor alterado para ${lookups.getSellerName(next)}`);
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
      lines.push(
        `Arquiteto alterado para ${lookups.getArchitectName(next)}`,
      );
    }
  }

  if (
    "architectParticipation" in data ||
    "previousArchitectParticipation" in data
  ) {
    const previous = data.previousArchitectParticipation;
    const next = data.architectParticipation;
    if (previous !== next) {
      lines.push(
        next
          ? "Participação na venda ativada"
          : "Participação na venda desativada",
      );
    }
  }

  if ("type" in data || "previousType" in data) {
    const previous = data.previousType;
    const next = data.type;
    if (previous !== next) {
      lines.push(
        `Tipo alterado de ${formatType(previous)} para ${formatType(next)}`,
      );
    }
  }

  if ("paidAt" in data || "previousPaidAt" in data) {
    const previous = data.previousPaidAt;
    const next = data.paidAt;
    if (previous !== next) {
      const hadPayment = Boolean(previous);
      const hasPayment = Boolean(next);
      if (!hadPayment && hasPayment) {
        lines.push(
          `Pagamento efetuado em ${formatDateTimeShort(String(next))}`,
        );
      } else if (hadPayment && !hasPayment) {
        lines.push("Pagamento desmarcado");
      } else if (hadPayment && hasPayment) {
        lines.push(
          `Data de pagamento alterada de ${formatDateTimeShort(String(previous))} para ${formatDateTimeShort(String(next))}`,
        );
      }
    }
  }

  if ("obsReceipt" in data || "previousObsReceipt" in data) {
    const previous = data.previousObsReceipt;
    const next = data.obsReceipt;
    if (previous !== next) {
      lines.push(
        `Obs. recibo alterada de "${formatText(previous)}" para "${formatText(next)}"`,
      );
    }
  }

  if ("obsInternal" in data || "previousObsInternal" in data) {
    const previous = data.previousObsInternal;
    const next = data.obsInternal;
    if (previous !== next) {
      lines.push("Obs. interna atualizada");
    }
  }

  if ("checkout" in data || "previousCheckout" in data) {
    lines.push(
      ...buildSaleCheckoutHistoryLines(
        data.previousCheckout,
        data.checkout,
        lookups.getProductName,
      ),
    );
  }

  return lines;
}

export function SaleHistoryTimeline({
  items,
  lookups,
}: SaleHistoryTimelineProps) {
  if (items.length === 0) {
    return (
      <p className="text-sm text-kyowa-muted">Nenhum evento no histórico.</p>
    );
  }

  return (
    <ol className="relative border-l border-kyowa-border pl-5">
      {items.map((item, index) => {
        const details = formatSaleHistoryDetails(item.data, lookups);

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