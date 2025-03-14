import type { IconType } from "react-icons";
import {
  HiChartPie,
  HiCurrencyDollar,
  HiPencilAlt,
  HiShoppingBag,
} from "react-icons/hi";
import type { Module } from "./definitions";

export type RoutesType = {
  session: string;
  icon: IconType;
  pages: {
    title: string;
    pathname: string;
  }[];
};

export const Routes: Record<Module, RoutesType> = {
  GERAL: {
    session: "Geral",
    icon: HiChartPie,
    pages: [
      {
        title: "Dashboard",
        pathname: "/dashboard",
      },
      {
        title: "Agenda Comercial",
        pathname: "/agenda",
      },
      {
        title: "Consultar Lacres",
        pathname: "/consultar-lacres",
      },
    ],
  },
  CADASTROS: {
    session: "Cadastros",
    icon: HiPencilAlt,
    pages: [
      {
        title: "Usuarios",
        pathname: "/usuarios",
      },
      {
        title: "Lojas",
        pathname: "/lojas",
      },
      {
        title: "Arquitetos",
        pathname: "/arquitetos",
      },
      {
        title: "Clientes",
        pathname: "/clientes",
      },
      {
        title: "Fornecedores",
        pathname: "/fornecedores",
      },
    ],
  },
  PRODUTOS: {
    session: "Produtos",
    icon: HiShoppingBag,
    pages: [
      {
        title: "Produtos",
        pathname: "/produtos",
      },
      {
        title: "Cadastrar lacres",
        pathname: "/cadastrar-lacres",
      },
    ],
  },
  COMERCIAL_VENDAS: {
    session: "Comercial/Vendas",
    icon: HiCurrencyDollar,
    pages: [
      {
        title: "Orçamentos",
        pathname: "/orcamentos",
      },
    ],
  },
  SERVICOS: {
    session: "Serviços",
    icon: HiChartPie,
    pages: [
      {
        title: "Lavagem - Tapetes",
        pathname: "/lavagem-tapetes",
      },
    ],
  },
  FINANCEIRO: {
    session: "Financeiro",
    icon: HiChartPie,
    pages: [
      {
        title: "Comissões",
        pathname: "/comissoes",
      },
    ],
  },
};
