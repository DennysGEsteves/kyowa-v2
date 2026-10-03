/** Grid de campos em 2–4 colunas conforme a largura da tela */
export const formFieldGrid2 =
  "grid gap-4 sm:grid-cols-2";

export const formFieldGrid3 =
  "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";

export const formFieldGrid4 =
  "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

/** Endereço em linha única em telas grandes (largura total) */
export const formAddressGrid =
  "grid gap-4 sm:grid-cols-2 lg:grid-cols-6";

/** Endereço dentro de coluna do formulário (metade da largura) */
export const formAddressGridInColumn = "grid gap-4 sm:grid-cols-2";

/** Formulário em duas colunas (tablet+) */
export const formTwoColumns =
  "grid gap-8 md:grid-cols-2 md:items-start";

/** Conteúdo empilhado dentro de cada coluna */
export const formColumn = "flex flex-col gap-6";

/** @deprecated use formTwoColumns */
export const formSectionsTwoColumns = formTwoColumns;

export const formSectionStack = "space-y-4";

export const formSectionTitle =
  "text-xs font-semibold uppercase tracking-wider text-kyowa-muted";
