export type ProductLookupSlug =
  | "categories"
  | "colors"
  | "designs"
  | "heights"
  | "models"
  | "origins"
  | "shapes"
  | "sizes"
  | "units";

export type ProductLookupTab = {
  slug: ProductLookupSlug;
  label: string;
  singular: string;
};

export const PRODUCT_LOOKUP_TABS: ProductLookupTab[] = [
  { slug: "categories", label: "Categorias", singular: "categoria" },
  { slug: "colors", label: "Cores", singular: "cor" },
  { slug: "designs", label: "Desenhos", singular: "desenho" },
  { slug: "heights", label: "Alturas", singular: "altura" },
  { slug: "models", label: "Modelos", singular: "modelo" },
  { slug: "origins", label: "Origens", singular: "origem" },
  { slug: "shapes", label: "Formatos", singular: "formato" },
  { slug: "sizes", label: "Tamanhos", singular: "tamanho" },
  { slug: "units", label: "Unidades", singular: "unidade" },
];
