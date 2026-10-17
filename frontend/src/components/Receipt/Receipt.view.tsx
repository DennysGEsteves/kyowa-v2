"use client";

import reciboBottom from "@/assets/images/recibo_bottom.png";
import reciboTop from "@/assets/images/recibo_top.png";
import type { Address, Client, User } from "@entities";
import { formatDateShort } from "@/utils/date";
import { formatCurrencyBRLFromNumber } from "@/utils/masks";
import Image from "next/image";
import "./Receipt.css";

const RECEIPT_POPUP_WIDTH = 920;
const RECEIPT_POPUP_HEIGHT = 900;

const RECEIPT_FOOTER_LEGAL =
  "Walid Abdouni Tapeçaria Ltda. - CNPJ: 06.787.398/0001-34";

const receiptTermsSections = [
  {
    title: "Pisos",
    items: [
      "Local deve estar limpo, sem imperfeições e sem móveis pesados; ajustes de portas serão cobrados separados.",
      "Se no ato da remoção houver danos em virtude da base do chão, o reparo será de responsabilidade do cliente. O fato pode alterar a data de entrega.",
    ],
  },
  {
    title: "Papel de parede",
    items: [
      "Se no ato da remoção houver danos em virtude da pintura frágil, o reparo será de responsabilidade do cliente. O fato pode alterar a data de entrega.",
      "Instalação somente sobre látex à base de água na cor branca; não removemos TVs e aparelhos eletrônicos.",
      "Prazo do papel importado: 20 a 30 dias úteis, podendo variar por trâmite alfandegário.",
    ],
  },
] as const;

const receiptTermsDeadlines = [
  "Cortina: 15 a 20 dias úteis.",
  "Papel de parede: 15 a 20 dias úteis (importado 20 a 30 dias úteis).",
  "Persiana: 15 a 20 dias úteis.",
  "Piso laminado ou vinílico: 15 a 20 dias úteis.",
  "Rodapé: 15 a 20 dias úteis.",
  "Estofado: 20 a 30 dias úteis (após retirada do mobiliário e/ou projeto aprovado).",
  "Tapetes: 30 a 60 dias corridos (após cores e desenho aprovados).",
] as const;

export function openReceiptWindow(url: string): void {
  const left = Math.round((window.screen.availWidth - RECEIPT_POPUP_WIDTH) / 2);
  const top = Math.round(
    (window.screen.availHeight - RECEIPT_POPUP_HEIGHT) / 2,
  );

  window.open(
    url,
    `orcamento-recibo-${Date.now()}`,
    `popup=yes,width=${RECEIPT_POPUP_WIDTH},height=${RECEIPT_POPUP_HEIGHT},left=${left},top=${top},scrollbars=yes,resizable=yes`,
  );
}

type ReceiptLine = {
  quantity: number;
  description: string;
  price: number;
};

type ReceiptProps = {
  client: Client;
  seller: User;
  obs: string;
  nature: "budget" | "sale";
  receiptNumber: string;
  checkout: ReceiptLine[];
  showTerms: boolean;
};

function streetLine(address: Address | null | undefined): string {
  if (!address) return "";
  return [address.street, address.number].filter(Boolean).join(", ");
}

function phonesLine(client: Client | undefined): string {
  if (!client) return "";
  return [client.phone1, client.phone2].filter(Boolean).join(" / ");
}

function natureLine(nature: ReceiptProps["nature"]): string {
  return nature === "budget" ? "Orçamento" : "Venda";
}

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

function ReceiptDocument({ data }: { data: ReceiptProps }) {
  const total = data.checkout.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="receipt__sheet">
      <header className="receipt__chrome receipt__chrome--top" aria-hidden>
        <Image
          src={reciboTop.src}
          alt=""
          width={reciboTop.width}
          height={reciboTop.height}
          decoding="sync"
        />
      </header>

      <footer className="receipt__chrome receipt__chrome--bottom">
        <Image
          src={reciboBottom}
          alt=""
          width={reciboBottom.width}
          height={reciboBottom.height}
        />
        <p className="receipt__bottom-legal">{RECEIPT_FOOTER_LEGAL}</p>
      </footer>

      <main className="receipt__body">
        <header className="receipt__head">
          <div>
            <p className="receipt__subtitle">
              Recibo de {natureLine(data.nature)}
            </p>
            <h1 className="receipt__title">Nº {data.receiptNumber}</h1>
          </div>
          <p className="receipt__meta-date">
            Data: {formatDateShort(new Date())}
          </p>
        </header>

        <div className="receipt__grid">
          <InfoBlock
            title="Cliente"
            rows={[
              { label: "Nome", value: data.client.name },
              { label: "Endereço", value: streetLine(data.client.address) },
              { label: "Bairro", value: data.client.address?.district ?? "" },
              { label: "Cidade", value: data.client.address?.city ?? "" },
              { label: "Telefone", value: phonesLine(data.client) },
            ]}
          />
          <InfoBlock
            title="Atendimento"
            rows={[
              { label: "Vendedor(a)", value: data.seller.name },
              { label: "Natureza", value: natureLine(data.nature) },
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
            {data.checkout.length === 0 ? (
              <tr>
                <td colSpan={3}>Nenhum item no orçamento.</td>
              </tr>
            ) : (
              data.checkout.map((line, index) => (
                <tr key={`${index}-${line.description}`}>
                  <td className="col-qty">{line.quantity}</td>
                  <td>{line.description}</td>
                  <td className="col-money">
                    {formatCurrencyBRLFromNumber(line.price)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="receipt__total">
          <div className="receipt__total-box">
            <strong>Total</strong>
            <span>{formatCurrencyBRLFromNumber(total)}</span>
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

export function Receipt({
  client,
  seller,
  obs,
  nature,
  receiptNumber,
  checkout,
  showTerms,
}: ReceiptProps) {
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
      <ReceiptDocument
        data={{
          client,
          seller,
          obs,
          nature,
          receiptNumber,
          checkout,
          showTerms,
        }}
      />
    </div>
  );
}
