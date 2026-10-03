export const adminRoutes = {
  stores: {
    list: "/admin/nossas-lojas",
    new: "/admin/nossas-lojas/novo",
    edit: (id: string) => `/admin/nossas-lojas/${id}`,
  },
  providers: {
    list: "/admin/fornecedores",
    new: "/admin/fornecedores/novo",
    edit: (id: string) => `/admin/fornecedores/${id}`,
  },
  architects: {
    list: "/admin/arquitetos",
    new: "/admin/arquitetos/novo",
    edit: (id: string) => `/admin/arquitetos/${id}`,
  },
  clients: {
    list: "/admin/clientes",
    new: "/admin/clientes/novo",
    edit: (id: string) => `/admin/clientes/${id}`,
  },
  users: {
    list: "/admin/usuarios",
    new: "/admin/usuarios/novo",
    edit: (id: string) => `/admin/usuarios/${id}`,
  },
  products: {
    list: "/admin/produtos",
    new: "/admin/produtos/novo",
    edit: (id: string) => `/admin/produtos/${id}`,
    descriptors: {
      list: "/admin/produtos/descritores",
    },
  },
} as const;
