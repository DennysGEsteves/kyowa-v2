"use client";

import { useBudgetDetailQuery } from "@/api/Budgets/budgets.query";
import { useClientsQuery } from "@/api/Clients/clients.query";
import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { useUsersQuery } from "@/api/Users/users.query";
import reciboBottom from "@/assets/images/recibo_bottom.png";
import reciboTop from "@/assets/images/recibo_top.png";
import { useMemo } from "react";
import { buildReceiptModel, type ReceiptModel } from "./build-receipt-model";
import {
  RECEIPT_FOOTER_LEGAL,
  receiptTermsDeadlines,
  receiptTermsSections,
} from "./receipt-terms";
import "./BudgetReceipt.css";

type BudgetReceiptViewProps = {
  budgetId: string;
};

function InfoBlock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  const visible = rows.filter((row) => row.value.trim());
  if (visible.length === 0) return null;

  return (
    <section className="receipt__block">
      <h3 className="receipt__block-title">{title}</h3>
      <dl className="receipt__rows">
        {visible.map((row) => (
          <div key={row.label} className="receipt__row">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ReceiptDocument({ data }: { data: ReceiptModel }) {
  return (
    <div className="receipt__sheet">
      <header className="receipt__chrome receipt__chrome--top" aria-hidden>
        <img
          src={reciboTop.src}
          alt=""
          width={reciboTop.width}
          height={reciboTop.height}
          decoding="sync"
        />
      </header>

      <footer className="receipt__chrome receipt__chrome--bottom">
        <img
          src={reciboBottom.src}
          alt=""
          width={reciboBottom.width}
          height={reciboBottom.height}
          decoding="sync"
        />
        <p className="receipt__bottom-legal">{RECEIPT_FOOTER_LEGAL}</p>
      </footer>

      <main className="receipt__body">
        <header className="receipt__head">
          <div>
            <p className="receipt__subtitle">Recibo de orçamento</p>
            <h1 className="receipt__title">Nº {data.number}</h1>
          </div>
          <p className="receipt__meta-date">Data: {data.date}</p>
        </header>

        <div className="receipt__grid">
          <InfoBlock
            title="Cliente"
            rows={[
              { label: "Nome", value: data.clientName },
              { label: "Endereço", value: data.street },
              { label: "Bairro", value: data.district },
              { label: "Cidade", value: data.city },
              { label: "Telefone", value: data.phones },
            ]}
          />
          <InfoBlock
            title="Atendimento"
            rows={[
              { label: "Vendedor(a)", value: data.sellerName },
              { label: "Natureza", value: "Orçamento" },
            ]}
          />
        </div>

        {data.obs ? (
          <section className="receipt__obs">
            <h3 className="receipt__block-title">Observações</h3>
            <p>{data.obs}</p>
          </section>
        ) : null}

        <table className="receipt__table">
          <thead>
            <tr>
              <th>Quant.</th>
              <th>Descrição</th>
              <th>Subtotal (R$)</th>
            </tr>
          </thead>
          <tbody>
            {data.lines.length === 0 ? (
              <tr>
                <td colSpan={3}>Nenhum item no orçamento.</td>
              </tr>
            ) : (
              data.lines.map((line, index) => (
                <tr key={`${index}-${line.description}`}>
                  <td className="col-qty">{line.quantity}</td>
                  <td>{line.description}</td>
                  <td className="col-money">{line.subtotal}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="receipt__total">
          <div className="receipt__total-box">
            <strong>Total</strong>
            <span>{data.total}</span>
          </div>
        </div>

        <section className="receipt__terms">
          <h2>Prazos e condições</h2>
          {receiptTermsSections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {receiptTermsDeadlines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
      </main>
    </div>
  );
}

export function BudgetReceiptView({ budgetId }: BudgetReceiptViewProps) {
  const { data: budget, isLoading, isError } = useBudgetDetailQuery(budgetId);
  const { data: clients = [] } = useClientsQuery();
  const { data: users = [] } = useUsersQuery();
  const { data: categories = [] } = useProductLookupQuery("categories");

  const categoryNameById = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  const receipt = useMemo(() => {
    if (!budget) return null;
    return buildReceiptModel(budget, {
      client: clients.find((c) => c.id === budget.clientId),
      seller: users.find((u) => u.id === budget.userId),
      categoryNameById,
    });
  }, [budget, categoryNameById, clients, users]);

  if (isLoading) {
    return (
      <p className="p-8 text-center text-sm text-kyowa-muted">
        Carregando recibo…
      </p>
    );
  }

  if (isError || !receipt) {
    return (
      <p className="p-8 text-center text-sm text-red-600">
        Não foi possível carregar o recibo.
      </p>
    );
  }

  return (
    <div className="receipt">
      <div className="receipt__toolbar">
        <button type="button" onClick={() => window.print()}>
          Imprimir
        </button>
        <button
          type="button"
          data-variant="primary"
          onClick={() => window.close()}
        >
          Fechar
        </button>
      </div>
      <ReceiptDocument data={receipt} />
    </div>
  );
}
