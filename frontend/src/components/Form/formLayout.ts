/** Grid de campos em 2–4 colunas conforme a largura da tela */
export const formFieldGrid2 = "grid gap-4 sm:grid-cols-2";

export const formFieldGrid3 = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export const formFieldGrid4 = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

/** Endereço em linha única em telas grandes (largura total) */
export const formAddressGrid = "grid gap-4 sm:grid-cols-2 lg:grid-cols-6";

/** Endereço dentro de coluna do formulário (metade da largura) */
export const formAddressGridInColumn = "grid gap-4 sm:grid-cols-2";

/** Formulário em duas colunas (tablet+) */
export const formTwoColumns = "grid gap-8 md:grid-cols-2 md:items-start";

/** Conteúdo empilhado dentro de cada coluna */
export const formColumn = "flex flex-col gap-6";

/** @deprecated use formTwoColumns */
export const formSectionsTwoColumns = formTwoColumns;

export const formSectionStack = "space-y-4";

/** Duas colunas lado a lado (cada coluna empilha seus blocos em FormSectionsColumn) */
export const formSectionsGrid =
  "grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start md:gap-x-4";

/** Pilha de cards dentro de uma coluna do formulário */
export const formSectionsColumn = "flex min-w-0 flex-col gap-4";

/** Card de uma seção do formulário */
export const formSectionBlock =
  "rounded-sm border border-kyowa-border bg-white p-4 sm:p-5";

export const formSectionTitle =
  "mb-3 text-xs font-semibold uppercase tracking-wider text-kyowa-muted sm:mb-4";
