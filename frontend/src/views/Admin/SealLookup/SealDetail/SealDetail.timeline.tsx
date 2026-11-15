import Link from "next/link";
import { SealStatusBadge } from "@/components/SealStatusBadge";
import type { SealHistoryViewItem } from "@entities";
import { formatDateTimeShort } from "@/utils/date";
import { routes } from "@routes";
import type { ReactNode } from "react";

type SealHistoryTimelineProps = {
  items: SealHistoryViewItem[];
};

const SEAL_HISTORY_EVENT_CREATED = "created";
const SEAL_HISTORY_EVENT_ASSIGNED = "assigned_to_sale_checkout";
const SEAL_HISTORY_EVENT_RETURNED = "returned_to_stock";
const SEAL_HISTORY_EVENT_CONVERTED = "consignment_converted_to_sale";

const saleRecordLinkClass =
  "font-medium text-kyowa-maroon underline underline-offset-2 hover:text-kyowa-maroon/80";

function saleKindLabel(saleType: unknown): string {
  return saleType === "consignment" ? "Consignação" : "Venda";
}

function saleRecordTitle(saleType: unknown, sequentialId: unknown): string {
  const kind = saleKindLabel(saleType);
  if (typeof sequentialId === "number") {
    return `${kind} #${sequentialId}`;
  }
  return kind;
}

function saleEditHref(saleId: string, saleType: unknown): string {
  return saleType === "consignment"
    ? routes.consignment.edit(saleId)
    : routes.sales.edit(saleId);
}

function SaleCheckoutHistoryLink({
  data,
  action,
}: {
  data: Record<string, unknown>;
  action: "linked" | "unlinked";
}) {
  const saleId = typeof data.saleId === "string" ? data.saleId : "";
  if (!saleId) {
    return (
      <p className="text-sm text-kyowa-muted">
        {action === "linked"
          ? "Vinculado a um registro comercial"
          : "Retornado ao estoque"}
      </p>
    );
  }

  const title = saleRecordTitle(data.saleType, data.saleSequentialId);
  const href = saleEditHref(saleId, data.saleType);
  const prefix =
    action === "linked"
      ? "Vinculado à"
      : "Removido do checkout e devolvido ao estoque (era ";

  if (action === "linked") {
    return (
      <p className="text-sm text-kyowa-muted">
        {prefix}{" "}
        <Link href={href} className={saleRecordLinkClass}>
          {title}
        </Link>
      </p>
    );
  }

  return (
    <p className="text-sm text-kyowa-muted">
      {prefix}
      <Link href={href} className={saleRecordLinkClass}>
        {title}
      </Link>
      )
    </p>
  );
}

function formatHistoryDetails(data: Record<string, unknown>): ReactNode[] {
  if (data.event === SEAL_HISTORY_EVENT_CREATED) {
    return ["Lacre criado"];
  }

  if (data.event === SEAL_HISTORY_EVENT_ASSIGNED) {
    return [
      <SaleCheckoutHistoryLink
        key="sale-linked"
        data={data}
        action="linked"
      />,
    ];
  }

  if (data.event === SEAL_HISTORY_EVENT_RETURNED) {
    return [
      <SaleCheckoutHistoryLink
        key="sale-unlinked"
        data={data}
        action="unlinked"
      />,
    ];
  }

  if (data.event === SEAL_HISTORY_EVENT_CONVERTED) {
    const saleId = typeof data.saleId === "string" ? data.saleId : "";
    if (!saleId) {
      return ["Consignação convertida em venda"];
    }
    const title = saleRecordTitle("sale", data.saleSequentialId);
    const href = routes.sales.edit(saleId);
    return [
      <p key="converted" className="text-sm text-kyowa-muted">
        Consignação convertida em{" "}
        <Link href={href} className={saleRecordLinkClass}>
          {title}
        </Link>
      </p>,
    ];
  }

  const lines: ReactNode[] = [];

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
              {formatDateTimeShort(item.createdAt)}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <SealStatusBadge status={item.status} />
              <span className="text-sm text-kyowa-ink">{item.userName}</span>
            </div>
            {details.length > 0 ? (
              <ul className="mt-1 space-y-0.5 text-sm text-kyowa-muted">
                {details.map((line, detailIndex) => (
                  <li key={detailIndex}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-kyowa-muted">Alteração registrada</p>
            )}
          </li>
        );
      })}
    </ol>
  );
}