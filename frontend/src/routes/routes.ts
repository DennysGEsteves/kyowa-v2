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
    ],
  },
  CADASTROS: {
    session: "Cadastros",
    icon: HiPencilAlt,
    pages: [
      {
        title: "Usuarios",
        pathname: "/cadastros/usuarios",
      },
      {
        title: "Lojas",
        pathname: "/cadastros/lojas",
      },
      {
        title: "Arquitetos",
        pathname: "/cadastros/arquitetos",
      },
      {
        title: "Clientes",
        pathname: "/cadastros/clientes",
      },
      {
        title: "Fornecedores",
        pathname: "/cadastros/fornecedores",
      },
    ],
  },
  PRODUTOS: {
    session: "Produtos",
    icon: HiShoppingBag,
    pages: [
      {
        title: "Cadastrar Produtos",
        pathname: "/produtos/produtos",
      },
      {
        title: "Consultar Lacres",
        pathname: "/produtos/consultar-lacres",
      },
      {
        title: "Descritores",
        pathname: "/produtos/descritores",
      },
      {
        title: "Atualizar preços",
        pathname: "/produtos/atualizar-precos",
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
